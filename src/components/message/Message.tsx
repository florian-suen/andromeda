import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useContext, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import ImageView from "react-native-image-viewing";

import { Video, ResizeMode } from "expo-av";
import { userContext } from "../../../utility/userAuth";
import { Attachments, Media } from "../../redux/messages/messageSlice";
import Colors from "../../constants/Colors";
dayjs.extend(relativeTime);

export type Message = {
  chatgroupID: string;
  message: string;
  status: string;
  createdAt: string | null;
  userID: string | null;
  id: string | null;
  Media: { items: Media[] };
  Attachments: { items: Attachments[] };
};

export const Message = ({ message }: { message: Message }) => {
  const myMsg = useRef(false);
  const userAuth = useContext(userContext);
  const [attachments, setAttachments] = useState<any>([]);
  const [mediaSrc, setMediaSrc] = useState<any>([]);
  const [imageViewerVisibility, setimageViewerVisibility] = useState(false);
  let imgViewerIndex = useRef(0);

  if (userAuth && message.userID === userAuth.attributes.sub)
    myMsg.current = true;

  useEffect(() => {
    const getAttachements = async () => {
      if (message && message.Attachments && message.Attachments.items.length) {
        const uriAttachments = await Promise.all(
          message.Attachments.items.map((attachment: any) =>
            Storage.get(attachment.storageKey).then((uri) => ({
              ...attachment,
              uri,
            }))
          )
        );
        setAttachments(uriAttachments);
      }
    };

    getAttachements();
  }, [message.Attachments.items]);

  useEffect(() => {
    const getMedia = async () => {
      if (message && message.Media && message.Media.items.length) {
        const uriMedia = await Promise.all(
          message.Media.items.map((media: any) =>
            Storage.get(media.storageKey).then((uri) => ({
              ...media,
              uri,
            }))
          )
        );
        setMediaSrc(uriMedia);
      }
    };
    getMedia();
  }, [message.Media.items.length]);

  return (
    <View
      style={[
        { flexDirection: "row" },
        message.status === "sending"
          ? { alignSelf: "flex-end" }
          : myMsg.current
          ? { alignSelf: "flex-end" }
          : { alignSelf: "flex-start" },
      ]}
    >
      {message.status === "sending" && (
        <ActivityIndicator color={Colors.tertiary} size={"small"} />
      )}
      <View
        key={message.id}
        style={[
          styles.container,
          message.status === "sending"
            ? styles.containerWaiting
            : myMsg.current
            ? styles.containerme
            : styles.containerfriend,
        ]}
      >
        {mediaSrc.length > 0 && mediaSrc[0].type === "VIDEO" && (
          <Video
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            source={{
              uri: mediaSrc[0].uri,
            }}
            shouldPlay={false}
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}

        {mediaSrc.length > 0 && mediaSrc[0].type === "IMAGE" && (
          <>
            <ImageView
              images={mediaSrc}
              visible={imageViewerVisibility}
              imageIndex={imgViewerIndex.current}
              onRequestClose={() => setimageViewerVisibility(false)}
            />

            <FlatList
              data={mediaSrc}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      imgViewerIndex.current = index;
                      setimageViewerVisibility(true);
                    }}
                  >
                    <Image style={styles.image} source={{ uri: item.uri }} />
                  </Pressable>
                );
              }}
            />
          </>
        )}

        {attachments.length > 0 && (
          <FlatList
            data={attachments}
            renderItem={({ item }) => {
              return <Text>You have files {item.type}</Text>;
            }}
          />
        )}
        <Text style={styles.message}>{message.message}</Text>
        {message.status !== "sending" && (
          <Text style={styles.time}>
            {dayjs(message.createdAt).fromNow(true)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    borderWidth: 3,
    borderRadius: 5,
    maxWidth: "75%",
  },

  container: {
    margin: 7,
    padding: 10,
    borderRadius: 5,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.0,
    elevation: 1,
  },

  containerWaiting: {
    backgroundColor: Colors.messageTwo,
    opacity: 0.6,
    padding: 10,
  },

  containerfriend: {
    backgroundColor: Colors.messageOne,
  },
  containerme: {
    backgroundColor: Colors.messageTwo,
  },
  time: {
    fontStyle: "italic",
    color: "purple",
    alignSelf: "flex-end",
    fontSize: 10,
  },
  message: { fontFamily: "Exo2" },
});
