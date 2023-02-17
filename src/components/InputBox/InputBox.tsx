import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createMessage,
  updateChatGroup,
  createAttachment,
  createMedia,
} from "../../graphql/mutations";
import { API, graphqlOperation, Storage } from "aws-amplify";
import * as imagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { addMessage } from "../../redux/messages/messageSlice";
import { useDispatch } from "react-redux";
import { userContext } from "../../../utility/userAuth";
import { useAppSelector } from "../../../utility/useReduxHooks";
import { ChatGroupType } from "../../redux/chatGroup/chatGroupSlice";
import { ContactType } from "../../redux/contactList/contactListSlice";
import Colors from "../../constants/Colors";

type messageInput = {
  chatgroupID: string;
  message: string;
  userID: string;
  createdAt: string;
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
  mimeType: string;
  name: string;
};

type mediaFile = {
  uri: string;
  type: "image" | "video";
  duration: string;
  width: string;
  height: string;
};

export const InputBox = ({
  chatGroup,
  blockData,
}: {
  chatGroup: ChatGroupType["Chatgroup"];
  blockData: {
    blockAlert: boolean;
    setBlockAlert: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) => {
  const userAuth = useContext(userContext);
  const [inputText, setInputText] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [media, setMedia] = useState<imagePicker.ImagePickerAsset[]>([]);
  const inputOpacity = new Animated.Value(0);
  const inputScale = new Animated.Value(0);
  const animateInput = useRef(true);
  const currentUserID = useContext(userContext)?.attributes.sub!;
  const contact = useAppSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  const interpo = inputScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 1],
  });
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
  const pickAttachment = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "*/*",
    });

    if (result.type === "success" && attachments.length < 5)
      setAttachments((existing) => [...existing, result]);
    else if (attachments.length > 4) {
      Alert.alert(
        "Max attachment exceeded",
        `Only a maximum of 5 files are allowed`,
        [{ text: "OK", style: "cancel" }]
      );
    }
  };

  const sendHandler = async () => {
    if (
      !chatGroup.leaderID &&
      checkIfBlocked(currentUserID, chatGroup, contact)
    ) {
      blockData.setBlockAlert(true);
      setInputText("");
      setMedia([]);
      setAttachments([]);
      return;
    }

    if (blockData.blockAlert) blockData.setBlockAlert(false);

    console.log("sending message");
    const createdAt = new Date().toISOString();
    dispatch(
      addMessage({
        chatGroupId: chatGroup.id,
        newMessage: inputText,
        createdAt,
      })
    );

    const newInput: messageInput = {
      chatgroupID: chatGroup.id,
      message: inputText,
      userID: userAuth!.attributes.sub,
      createdAt,
    };

    setInputText("");
    const newMessage = await API.graphql(
      graphqlOperation(createMessage, { input: newInput })
    );
    const newMessageId =
      "data" in newMessage && newMessage.data.createMessage.id;

    if (media.length) {
      await Promise.all(
        media.map((file) => addMedia(file, newMessageId, chatGroup.id))
      );
      setMedia([]);
    }
    if (attachments.length) {
      await Promise.all(
        attachments.map((file) =>
          addAttachment(file, newMessageId, chatGroup.id)
        )
      );
      setAttachments([]);
    }

    API.graphql(
      graphqlOperation(updateChatGroup, {
        input: {
          chatGroupLastMessageId: newMessageId,
          id: chatGroup.id,
          _version: chatGroup._version,
        },
      })
    );
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
      {attachments.length > 0 && (
        <View>
          <Text>You currently have {attachments.length} files</Text>
          {attachments.map((val, i) => {
            return (
              <Text key={val.uri + i}>
                File name:{val.name} Size:{val.size}
              </Text>
            );
          })}
        </View>
      )}

      {media.length > 0 && (
        <FlatList
          data={media}
          horizontal
          renderItem={({ item }) => {
            return (
              <View style={styles.imageContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.selectedImage}
                  source={{ uri: item.uri }}
                />

                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color={Colors.white}
                  style={styles.removeSelectedImage}
                  onPress={() =>
                    setMedia((media) => {
                      return media.filter((media) => media !== item);
                    })
                  }
                />
              </View>
            );
          }}
        />
      )}

      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={inputText}
          onChangeText={setInputText}
        />
        <MaterialCommunityIcons
          onPress={() => pickMedia(true)}
          style={styles.plusCircleIcon}
          name="plus-circle-outline"
          size={30}
          color={"white"}
        />
        {inputText || media.length || attachments.length ? (
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
  const type = file.mimeType.split("/")[0] as "image";
  const newAttachment = {
    storageKey: await uploadFile(file.uri, type),
    type: FileType[type],
    name: file.name,
    messageID: messageId,
    chatgroupID: chatGroupId,
  };
  API.graphql(graphqlOperation(createAttachment, { input: newAttachment }));
};

const addMedia = async (
  file: imagePicker.ImagePickerAsset,
  messageId: string,
  chatGroupId: string
) => {
  const newMedia = {
    storageKey: await uploadFile(file.uri, file.type!),
    type: FileType[file.type!],
    duration: file.duration,
    width: file.width,
    height: file.height,
    messageID: messageId,
    chatgroupID: chatGroupId,
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

const checkIfBlocked = (
  currentUserId: string,
  chatGroup: ChatGroupType["Chatgroup"],
  contacts: ContactType[]
) => {
  const friendID = chatGroup.users.items.find(
    (item) => item.user.id !== currentUserId
  )?.user.id!;

  const userContact = contacts.find((item) => item.friendID === friendID);

  if (
    userContact?.requestStatus === "BLOCKED" ||
    userContact?.userContact.requestStatus === "BLOCKED"
  )
    return true;

  return false;
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    backgroundColor: Colors.tertiary,
    flex: 1,
    padding: 5,
    paddingHorizontal: 10,
  },
  selectedImage: {
    maxWidth: 100,
    maxHeight: 100,
    minHeight: 80,
    minWidth: 80,
    backgroundColor: Colors.black,
  },
  removeSelectedImage: {
    padding: 0,
    margin: 0,
    position: "absolute",
    top: 0,
    right: 0,
  },
  container: {
    flexDirection: "row",
    backgroundColor: Colors.tertiary,
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
