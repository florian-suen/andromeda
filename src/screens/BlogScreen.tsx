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
  const friendBlogs = useAppSelector((state) => {
    let blogArray: UserBlogsType[] = [];
    for (let i = 0; i < state.contacts.contacts.length; i += 1) {
      const friend = state.contacts.contacts[i].friend;
      const blogList =
        friend.Blog?.items &&
        friend.Blog.items.length &&
        friend.Blog.items.map((item) => {
          return {
            name: friend.username,
            image: friend.image,
            blog: item,
          };
        });

      blogArray = [...blogArray, ...(blogList || [])];
    }
    return blogArray;
  });

  const currentUserBlogs = useAppSelector((state) => {
    const currentUser = state.currentUser.currentUser!;
    const blogs =
      currentUser.Blog?.items && currentUser.Blog.items.length
        ? currentUser.Blog.items.map((item) => {
            return {
              name: currentUser.username,
              image: currentUser.image,
              blog: item,
            };
          })
        : [];
    return blogs || [];
  });

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
