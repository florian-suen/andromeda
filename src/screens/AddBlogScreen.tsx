import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createBlog, createMedia, updateUser } from "../graphql/mutations";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { userContext } from "../../utility/userAuth";

enum exts {
  image = "png",
  video = "mp4",
}

enum FileType {
  image = "IMAGE",
  video = "VIDEO",
}

enum contentTypes {
  image = "image/png",
  video = "video/mp4",
}

export const AddBlogScreen = () => {
  const userId = useContext(userContext)?.attributes.sub;
  const [inputText, setInputText] = useState("");
  const [media, setMedia] = useState<imagePicker.ImagePickerAsset[]>([]);
  const navigation = useNavigation();
  const pickMedia = async (multiple: boolean) => {
    setMedia([]);
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: multiple,
    });

    if (!result.canceled && result.assets.length) {
      setMedia(result.assets);
    } else if (!result.canceled) setMedia(result.assets);
  };

  const sendHandler = async () => {
    console.log("sending blog");
    navigation.goBack();
    const blogID = uuidv4();
    const newBlog = await API.graphql(
      graphqlOperation(createBlog, {
        input: { id: blogID, message: inputText, userID: userId },
      })
    );

    graphqlOperation(updateUser, { input: { id: blogID, message: inputText } });
    const newBlogId = "data" in newBlog && newBlog.data.createBlog.id;
    if (media.length) {
      await Promise.all(
        media.map((file) => addMedia(file, userId!, newBlogId))
      );
      setMedia([]);
    }
  };
  return (
    <View style={styles.container}>
      {media.length > 0 && (
        <View style={styles.mediaContainer}>
          <FlatList
            data={media}
            horizontal
            renderItem={({ item }) => {
              return (
                <>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="black"
                    style={styles.removeSelectedImage}
                    onPress={() =>
                      setMedia((media) => {
                        return media.filter((media) => media !== item);
                      })
                    }
                  />
                  <Image
                    resizeMode="contain"
                    style={styles.selectedImage}
                    source={{ uri: item.uri }}
                  />
                </>
              );
            }}
          />
        </View>
      )}
      <MaterialCommunityIcons
        onPress={() => pickMedia(true)}
        style={styles.plusCircleIcon}
        name="plus-circle-outline"
        size={30}
        color={"white"}
      />
      <TextInput
        value={inputText}
        numberOfLines={4}
        multiline
        style={styles.textInput}
        placeholder="Write Message"
        onChangeText={setInputText}
      />
      <Button title="Send" onPress={() => sendHandler()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2E3D59",
    padding: 5,
    paddingHorizontal: 6,
    borderColor: "black",
    alignItems: "center",
  },
  mediaContainer: {
    backgroundColor: "#2E3D59",
    padding: 5,
    paddingHorizontal: 6,
  },
  textInput: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    textAlignVertical: "top",
  },
  selectedImage: { width: 120, height: 120 },
  removeSelectedImage: {},
  plusCircleIcon: { paddingRight: 5 },
});

const addMedia = async (
  file: imagePicker.ImagePickerAsset,
  userId: string,
  blogId: string
) => {
  const newMedia = {
    storageKey: await uploadFile(file.uri, file.type!),
    type: FileType[file.type!],
    duration: file.duration,
    width: file.width,
    height: file.height,
    blogID: blogId,
    userID: userId,
  };

  API.graphql(graphqlOperation(createMedia, { input: newMedia }));
};

const uploadFile = async (uri: string, type: "video" | "image") => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const key = `${uuidv4()}.${exts[type]}`;
    await Storage.put(key, blob, {
      contentType: contentTypes[type],
    });
    return key;
  } catch (err) {
    console.log("Error uploading file:", err);
    return null;
  }
};
