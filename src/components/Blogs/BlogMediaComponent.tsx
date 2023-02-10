import { View, StyleSheet, Image } from "react-native";
import { MediaItem } from "./BlogComponent";

export const BlogMediaComponent = ({ media }: { media: MediaItem }) => {
  return (
    <View>
      <Image style={styles.image} source={{ uri: media.uri }}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { height: 200, width: 200 },
});
