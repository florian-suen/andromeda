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
  return (
    <View>
      <Image source={{ uri: userBlogs.image }}></Image>
      <Text>{userBlogs.name}</Text>
      <Text>{userBlogs.blog.message}</Text>
      {userBlogs.blog.Media.items.length > 0 && (
        <FlatList
          data={userBlogs.blog.Media.items as MediaItem[]}
          renderItem={({ item }: { item: MediaItem }) => {
            return <BlogMediaComponent media={item} />;
          }}
        />
      )}
    </View>
  );
};
