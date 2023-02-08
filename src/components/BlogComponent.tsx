import { View, Text, Image } from "react-native";
import { Media } from "../redux/messages/messageSlice";
import { UserBlogsType } from "../screens/BlogScreen";
export const BlogComponent = ({ userBlogs }: { userBlogs: UserBlogsType }) => {
  return (
    <View>
      <Image source={{ uri: userBlogs.image }}></Image>
      <Text>{userBlogs.name}</Text>
      <Text>{userBlogs.blog.message}</Text>
    </View>
  );
};
