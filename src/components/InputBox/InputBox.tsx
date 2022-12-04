import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Image,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createMessage,
  updateChatGroup,
  createAttachment,
} from "../../graphql/mutations";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import react from "react";
import * as imagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type messageInput = {
  chatgroupID: string;
  message: string;
  userID: string;
  images: [] | string[];
};

enum FileType {
  image = "IMAGE",
  video = "VIDEO",
}

enum exts {
  image = "png",
  video = "mp4",
}
enum contentTypes {
  image = "image/png",
  video = "video/mp4",
}

type file = {
  uri: string;
  type: "image" | "video";
  width: string;
  height: string;
  duration: string;
};

export const InputBox = ({ chatGroup }: { chatGroup: any }) => {
  const [inputText, setInputText] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const inputOpacity = new Animated.Value(0);
  const inputScale = new Animated.Value(0);
  const animateInput = useRef(true);
  const interpo = inputScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 1],
  });
  // note to create alert for attachments and possible zip the file. download button while listing all files.

  const pickImage = async (attachment: boolean) => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled && !attachment) {
      ((result as any).uri && setImages([(result as any).uri])) ||
        (result.selected &&
          setImages(result.selected.map((images) => images.uri)));
    } else if (!result.cancelled) {
      result.selected
        ? setAttachments(result.selected)
        : setAttachments([result]);
    }
  };

  const sendHandler = async () => {
    console.log("sending message");
    const currentUser = await Auth.currentAuthenticatedUser();

    const newInput: messageInput = {
      chatgroupID: chatGroup.id,
      message: inputText,
      userID: currentUser.attributes.sub,
      images: [],
    };

    if (images.length) {
      const imageFiles = await Promise.all(
        images.map((uri) => uploadFile(uri, "image"))
      );
      const filteredImageFiles = imageFiles.filter(
        (val): val is string => typeof val === "string"
      );
      filteredImageFiles.length ? (newInput.images = filteredImageFiles) : null;
      setImages([]);
    }

    const newMessage = await API.graphql(
      graphqlOperation(createMessage, { input: newInput })
    );
    const newMessageId =
      "data" in newMessage && newMessage.data.createMessage.id;
    console.log(attachments);

    attachments &&
      (await Promise.all(
        attachments.map((file) =>
          addAttachment(file, newMessageId, chatGroup.id)
        )
      ));

    API.graphql(
      graphqlOperation(updateChatGroup, {
        input: {
          chatGroupLastMessageId: newMessageId,
          id: chatGroup.id,
          _version: chatGroup._version,
        },
      })
    );

    setInputText("");
  };

  useEffect(() => {
    const opacityTiming = () => {
      Animated.timing(inputOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const scaleTiming = () => {
      Animated.timing(inputScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    animateInput.current =
      inputText.length === 0 && animateInput.current === true;
    const shouldAnimate = animateInput.current && inputText.length === 1;

    if (shouldAnimate)
      scaleTiming(), opacityTiming(), (animateInput.current = false);
  }, [inputText]);

  return (
    <>
      {images.length > 0 && (
        <View>
          <FlatList
            data={images}
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
                      setImages((images) => {
                        return images.filter((images) => images !== item);
                      })
                    }
                  />
                  <Image
                    resizeMode="contain"
                    style={styles.selectedImage}
                    source={{ uri: item }}
                  />
                </>
              );
            }}
          />
        </View>
      )}

      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={inputText}
          onChangeText={setInputText}
        />
        <MaterialCommunityIcons
          onPress={() => pickImage(true)}
          style={styles.plusCircleIcon}
          name="plus-circle-outline"
          size={30}
          color={"white"}
        />
        {true ? (
          <Animated.View
            style={{
              width: 22,
              marginRight: 7,
              //opacity: inputOpacity,
              // transform: [{ scale: interpo }],
            }}
          >
            <Ionicons
              style={styles.sendIcon}
              name="send"
              size={25}
              color={"white"}
              onPress={sendHandler}
            />
          </Animated.View>
        ) : null}
      </SafeAreaView>
    </>
  );
};

const addAttachment = async (
  file: file,
  messageId: string,
  chatGroupId: string
) => {
  const newAttachment = {
    storageKey: await uploadFile(file.uri, file.type),
    type: FileType[file.type],
    width: file.width,
    height: file.height,
    duration: file.duration,
    messageID: messageId,
    chatgroupID: chatGroupId,
  };
  API.graphql(graphqlOperation(createAttachment, { input: newAttachment }));
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

const styles = StyleSheet.create({
  selectedImage: { width: 120, height: 120 },
  removeSelectedImage: {},
  container: {
    flexDirection: "row",
    backgroundColor: "#2E3D59",
    padding: 5,
    paddingHorizontal: 6,
    borderColor: "black",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderRadius: 5,
    marginEnd: 5,
    marginLeft: 5,
    paddingLeft: 5,
  },
  fading: {},
  plusCircleIcon: { paddingRight: 5 },
  sendIcon: {
    minWidth: 26,
  },
});
