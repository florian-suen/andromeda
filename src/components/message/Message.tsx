import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useContext, useRef } from "react";
import * as FileSystem from "expo-file-system";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import ImageView from "react-native-image-viewing";
import { Feather } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { userContext } from "../../../utility/userAuth";
import Colors from "../../constants/Colors";
import { MediaItem } from "../Blogs/BlogComponent";
import { BlurView } from "expo-blur";
import * as MediaLibrary from "expo-media-library";
import { ProgressBar } from "react-native-paper";
import { Attachments, Media } from "../../redux/messages/types";

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

interface AttachmentType extends Attachments {
  uri: string;
}

export const Message = ({
  message,
}: {
  message: Message;
  openSelector: boolean;
}) => {
  let currentIndex = 0;
  const myMsg = useRef(false);
  const userAuth = useContext(userContext);
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
  const [mediaSrc, setMediaSrc] = useState<MediaItem[]>([]);
  const [imageViewerVisibility, setimageViewerVisibility] = useState(false);
  const [progress, setProgress] = useState<number[][]>([[0]]);
  const disableButton = useRef(false);
  const attachmentExists =
    message && message.Attachments && message.Attachments.items.length > 0;
  const mediaExists =
    message && message.Media && message.Media.items.length > 0;
  const isMaxedImage = mediaSrc.length > 4;
  let imgViewerIndex = useRef(0);
  if (userAuth && message.userID === userAuth.attributes.sub)
    myMsg.current = true;
  useEffect(() => {
    const getAttachements = async () => {
      if (attachmentExists) {
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

  const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
    const currentProgress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress((progress) => {
      const value = [...progress, [0]];
      value[currentIndex] = [currentProgress];
      return [...value];
    });
  };

  const downloadAttachments = async () => {
    const dateCreated = Date.parse(message.createdAt!);
    let downloadedUri = [];
    for (let i = 0; i < attachments.length; i += 1) {
      currentIndex = i;
      const checkDownloaded = await FileSystem.getInfoAsync(
        `${FileSystem.cacheDirectory}/${dateCreated}/`
      );

      /*  if (checkDownloaded.exists) {
        return;
      }
 */
      !checkDownloaded.exists &&
        FileSystem.makeDirectoryAsync(
          `${FileSystem.cacheDirectory}/${dateCreated}`
        );

      const downloadFile = FileSystem.createDownloadResumable(
        attachments[i].uri,
        `${FileSystem.cacheDirectory}/${dateCreated}/${attachments[i].name}`,
        {},
        callback
      );

      try {
        const downloadedFile = await downloadFile.downloadAsync();
        console.log("Finished downloading to ", downloadedFile?.uri);
        downloadedUri.push(downloadedFile?.uri);
      } catch (e) {
        console.error(e);
      }

      addMedia(
        downloadedUri.filter((item): item is string => item !== undefined)
      );
    }
  };

  const addMedia = async (uri: string[]) => {
    let status;
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.status !== "granted") {
      const requestPermission = await MediaLibrary.requestPermissionsAsync();
      status = requestPermission.status;
    }

    if (status !== "granted") {
      return;
    }

    try {
      const asset = await Promise.all(
        uri.map((uri) => {
          return MediaLibrary.createAssetAsync(uri);
        })
      );

      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album === null) {
        await MediaLibrary.createAlbumAsync("Andromeda", asset[0], false);
      }

      await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      key={message.id}
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

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                marginBottom: 5,
                backgroundColor: myMsg.current
                  ? Colors.attachBoxTwo
                  : Colors.attachBoxOne,
                borderRadius: 1,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "#a19291",
              }}
            >
              {mediaSrc.map((item, index) => {
                if (index < 4) {
                  return (
                    <Pressable
                      key={index}
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
                            color={myMsg.current ? "seashell" : Colors.tertiary}
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
              })}
            </View>
          </>
        )}
        {attachmentExists && attachments.length === 0 && (
          <ActivityIndicator style={{ padding: 10 }} />
        )}

        {mediaExists && mediaSrc.length === 0 && (
          <ActivityIndicator style={{ padding: 10 }} />
        )}
        {attachments.length > 0 && (
          <>
            <View
              key={message.createdAt}
              style={{
                marginBottom: 5,
                backgroundColor: myMsg.current
                  ? Colors.attachBoxTwo
                  : Colors.attachBoxOne,
                padding: 10,
                borderRadius: 2,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: myMsg.current ? "#6c3466" : "#3b696d",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              }}
            >
              {attachments.map((item, index) => {
                return (
                  <View key={item.updatedAt}>
                    <Text>File Name: {item.name}</Text>
                    {progress[index] !== undefined &&
                    progress[index][0] !== undefined &&
                    progress[index][0] > 0 ? (
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Exo2",
                            fontSize: 10,
                            marginRight: 5,
                          }}
                        >
                          {progress[index] !== undefined &&
                          progress[index][0] === 1
                            ? "Completed"
                            : "Downloading"}
                        </Text>
                        <ProgressBar
                          style={{
                            backgroundColor: Colors.white,
                            marginVertical: 5,
                            height: 4,
                            width: "50%",
                          }}
                          visible={
                            progress[index] !== undefined &&
                            progress[index][0] > 0
                          }
                          progress={progress[index] ? progress[index][0] : 0.5}
                          color={
                            myMsg.current
                              ? Colors.progressBarOne
                              : Colors.progressBarTwo
                          }
                        />
                      </View>
                    ) : null}
                  </View>
                );
              })}
              <View style={{ flexDirection: "row", padding: 3, marginTop: 5 }}>
                <Text style={{ marginTop: 5, flex: 1 }}>{`Total Size: ${(
                  attachments.reduce((prev, curr) => {
                    return prev + Number(curr.size);
                  }, 0) /
                  1000 /
                  1000
                ).toFixed(2)} MB`}</Text>
                <Pressable
                  disabled={disableButton.current}
                  onPress={() => {
                    !disableButton.current && downloadAttachments();
                    disableButton.current = true;
                  }}
                >
                  <Feather
                    style={{ opacity: progress[0][0] > 0 ? 0.2 : 1 }}
                    name="download"
                    size={24}
                    color="black"
                  />
                </Pressable>
              </View>
            </View>
          </>
        )}
        {message.message ? (
          <Text style={styles.message}>{message.message}</Text>
        ) : null}
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
    padding: StyleSheet.hairlineWidth,
  },
  container: {
    margin: 7,
    padding: 7,
    borderRadius: 3,
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
    marginTop: 3,
    fontStyle: "italic",
    color: Colors.tertiary,
    alignSelf: "flex-end",
    fontSize: 10,
  },
  message: { fontFamily: "Exo2" },
});
