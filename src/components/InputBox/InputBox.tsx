import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMessage, updateChatGroup } from "../../graphql/mutations";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import react from "react";
import * as imagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type messageInput = {
  chatgroupID: string;
  message: string;
  userID: string;
  images: [] | [string];
};

export const InputBox = ({ chatGroup }: { chatGroup: any }) => {
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const inputOpacity = new Animated.Value(0);
  const inputScale = new Animated.Value(0);
  const animateInput = useRef(true);
  const interpo = inputScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 1],
  });

  const uploadFile = async (fileUri: string) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png",
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
      return null;
    }
  };

  const pickImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
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

    if (image) {
      const file = await uploadFile(image);
      file ? (newInput.images = [file]) : null;
      setImage(null);
    }

    const newMessage = await API.graphql(
      graphqlOperation(createMessage, { input: newInput })
    );
    const newMessageId =
      "data" in newMessage && newMessage.data.createMessage.id;
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
      {image && (
        <View>
          <Ionicons
            name="remove-circle-outline"
            size={24}
            color="black"
            style={styles.removeSelectedImage}
            onPress={() => setImage(null)}
          />
          <Image
            resizeMode="contain"
            style={styles.selectedImage}
            source={{ uri: image }}
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
          onPress={pickImage}
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
