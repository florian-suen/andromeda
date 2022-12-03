import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { S3Image } from "aws-amplify-react-native";
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

  useEffect(() => {
    (async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setMymsg(message.userID === currentUser.attributes.sub);
    })();
  }, []);

  return (
    <View
      key={message.id}
      style={[
        styles.container,
        myMsg ? styles.containerme : styles.containerfriend,
      ]}
    >
      {message.images && message.images.length > 0 && (
        <S3Image style={styles.image} imgKey={message.images[0]} />
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
