import { FlatList, Text } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { BlogComponent } from "../components/Blogs/BlogComponent";
import { Media } from "../redux/messages/messageSlice";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type UserBlogsType = {
  name: string;
  image: string;
  blog: {
    createdAt: string;
    id: string;
    message: string;
    Media: {
      items: Media[];
    };
  };
};

type NavigationProp = {
  AddBlog: {};
};

export const BlogScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigationProp>>();
  const friendBlogs: UserBlogsType[] = useAppSelector(
    (state) => state.contacts.blogs
  );
  const currentUserBlogs: UserBlogsType[] = useAppSelector(
    (state) => state.currentUser.blog
  );

  const mergedBlogs = friendBlogs.concat(currentUserBlogs);
  const sortMergedBlogs = mergedBlogs.sort((item, itemTwo) => {
    if (Date.parse(item.blog.createdAt) > Date.parse(itemTwo.blog.createdAt))
      return -1;
    return 1;
  });

  return (
    <>
      <Octicons
        name="diff-added"
        size={30}
        color="black"
        onPress={() => {
          navigation.navigate("AddBlog", {});
        }}
      />
      {sortMergedBlogs.length ? (
        <>
          <FlatList
            data={sortMergedBlogs}
            renderItem={({ item }) => {
              return <BlogComponent userBlogs={item} />;
            }}
          ></FlatList>
          <FlatList
            data={[1, 2, 3]}
            renderItem={({ item }) => {
              return null;
            }}
          ></FlatList>
        </>
      ) : (
        <Text>{"No Transmissions currently available"}</Text>
      )}
    </>
  );
};
