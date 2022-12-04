import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { S3Image } from "aws-amplify-react-native";
import ImageView from "react-native-image-viewing";
dayjs.extend(relativeTime);

type Message = {
  chatgroupID: string;
  message: string;
  createdAt: string;
  userID: string;
  id: string;
  images: [string];
};

export const Message = ({ message }: { message: Message }) => {
  const [myMsg, setMymsg] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>([]);
  const [imageViewerVisibility, setimageViewerVisibility] = useState(false);
  let imgViewerIndex = useRef(0);
  useEffect(() => {
    (async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setMymsg(message.userID === currentUser.attributes.sub);
    })();
  }, []);

  useEffect(() => {
    const getImages = async () => {
      if (message.images?.length) {
        const uri = await Storage.get(message.images[0]);
        const uris = await Promise.all(message.images.map(Storage.get as any));
        const mappedUris = uris.map((uri) => ({ uri }));
        setImageSrc(mappedUris);
      }
    };
    getImages();
  }, [message.images]);

  return (
    <View
      key={message.id}
      style={[
        styles.container,
        myMsg ? styles.containerme : styles.containerfriend,
      ]}
    >
      {imageSrc.length > 0 && (
        <>
          <ImageView
            images={imageSrc}
            visible={imageViewerVisibility}
            imageIndex={imgViewerIndex.current}
            onRequestClose={() => setimageViewerVisibility(false)}
          />

          <FlatList
            data={imageSrc}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    imgViewerIndex.current = index;
                    setimageViewerVisibility(true);
                  }}
                >
                  <Image style={styles.image} source={item} />
                </Pressable>
              );
            }}
          />
        </>
      )}
      <Text style={styles.message}>{message.message}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
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
    margin: 6,
    padding: 15,
    borderRadius: 15,
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
  containerfriend: { backgroundColor: "lightblue", alignSelf: "flex-start" },
  containerme: { backgroundColor: "magenta", alignSelf: "flex-end" },
  time: { color: "purple", alignSelf: "flex-end" },
  message: {},
});
