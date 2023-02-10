import { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { UserBlogsType } from "../../screens/BlogScreen";
import { BlogMediaComponent } from "./BlogMediaComponent";
import { Storage } from "aws-amplify";
import { Media } from "../../redux/messages/messageSlice";

export interface MediaItem extends Media {
  uri: string;
}

export const BlogComponent = ({ userBlogs }: { userBlogs: UserBlogsType }) => {
  const [mediaSrc, setMediaSrc] = useState<MediaItem[]>([]);

  useEffect(() => {
    const getMedia = async () => {
      if (userBlogs?.blog?.Media?.items && userBlogs.blog.Media.items.length) {
        const uriMedia = await Promise.all(
          userBlogs.blog.Media.items.map((item) =>
            Storage.get(item.storageKey).then((uri) => ({
              ...item,
              uri,
            }))
          )
        );
        setMediaSrc(uriMedia);
      }
    };
    getMedia();
  }, [userBlogs.blog.Media.items.length]);

  return (
    <View>
      <Image source={{ uri: userBlogs.image }}></Image>
      <Text>{userBlogs.name}</Text>
      <Text>{userBlogs.blog.message}</Text>
      {mediaSrc.length > 0 && (
        <FlatList
          data={mediaSrc}
          renderItem={({ item }) => {
            return <BlogMediaComponent media={item} />;
          }}
        />
      )}
    </View>
  );
};
