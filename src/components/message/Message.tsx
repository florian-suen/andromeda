import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useContext, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import ImageView from "react-native-image-viewing";
import { Feather } from "@expo/vector-icons";

import { Video, ResizeMode } from "expo-av";
import { userContext } from "../../../utility/userAuth";
import { Attachments, Media } from "../../redux/messages/messageSlice";
import Colors from "../../constants/Colors";
import { MediaItem } from "../Blogs/BlogComponent";
import { BlurView } from "expo-blur";

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

export const Message = ({
  message,
}: {
  message: Message;
  openSelector: boolean;
}) => {
  const myMsg = useRef(false);
  const userAuth = useContext(userContext);
  const [attachments, setAttachments] = useState<any>([]);
  const [mediaSrc, setMediaSrc] = useState<MediaItem[]>([]);
  const [imageViewerVisibility, setimageViewerVisibility] = useState(false);
  const isMaxedImage = mediaSrc.length > 4;
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
        {
          flexDirection: "row",
        },
        message.status === "sending"
          ? { alignSelf: "flex-end" }
          : myMsg.current
          ? { alignSelf: "flex-end" }
          : { alignSelf: "flex-start" },
      ]}
    >
      {message.status === "sending" && (
        <ActivityIndicator color={Colors.secondary} size={"small"} />
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
              images={mediaSrc as any}
              visible={imageViewerVisibility}
              imageIndex={imgViewerIndex.current}
              onRequestClose={() => setimageViewerVisibility(false)}
            />

            <FlatList
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                marginBottom: -15,
                backgroundColor: myMsg.current
                  ? Colors.accentDark
                  : Colors.messageOneDark,
                borderRadius: 1,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "mistyrose",
              }}
              data={mediaSrc}
              renderItem={({ item, index }) => {
                if (index < 4) {
                  return (
                    <Pressable
                      style={styles.imageContainer}
                      onPress={() => {
                        imgViewerIndex.current = index;
                        setimageViewerVisibility(true);
                      }}
                    >
                      {isMaxedImage && index === 3 ? (
                        <View
                          style={[
                            styles.image,
                            {
                              backgroundColor: Colors.accent,
                              justifyContent: "center",
                              alignItems: "center",
                              zIndex: 1,
                            },
                          ]}
                        >
                          <Feather
                            style={{
                              position: "absolute",
                              zIndex: 1,
                              opacity: 0.7,
                            }}
                            name="plus-square"
                            size={40}
                            color={myMsg.current ? "seashell" : Colors.peacock}
                          />
                          <Image
                            style={[styles.image]}
                            source={{ uri: item.uri }}
                          />

                          <BlurView
                            intensity={110}
                            style={[
                              styles.image,
                              { position: "absolute", zIndex: 1 },
                            ]}
                          />
                        </View>
                      ) : (
                        <Image
                          style={[styles.image]}
                          source={{ uri: item.uri }}
                        />
                      )}
                    </Pressable>
                  );
                }

                return null;
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
    borderRadius: 1,
    aspectRatio: 1,
    width: 110,
  },
  imageContainer: {
    flex: 1,
    padding: StyleSheet.hairlineWidth,
  },
  container: {
    margin: 7,
    padding: 10,
    borderRadius: 5,
    maxWidth: "85%",
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
