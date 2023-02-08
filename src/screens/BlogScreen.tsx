import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  ViewStyle,
  ImageStyle,
  TextStyle,
  FlatList,
} from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { BlogComponent } from "../components/BlogComponent";
import { Media } from "../redux/messages/messageSlice";

export type UserBlogsType = {
  name: string;
  image: string;
  blog: {
    id: string;
    message: string;
    Media: {
      items: Media[];
    };
  };
};

export const BlogScreen = () => {
  const friendBlogs = useAppSelector((state) => {
    let blogArray: UserBlogsType[] = [];
    for (let i = 0; i < state.contacts.contacts.length; i += 1) {
      const friend = state.contacts.contacts[i].friend;
      const blogList = friend.Blog.items.map((item) => {
        return {
          name: friend.username,
          image: friend.image,
          blog: item,
        };
      });

      blogArray = [...blogArray, ...blogList];
    }
    return blogArray;
  });

  const currentUserBlogs = useAppSelector((state) => {
    const currentUser = state.currentUser.currentUser!;
    return currentUser.Blog.items.map((item) => {
      return {
        name: currentUser.username,
        image: currentUser.image,
        createdAt: item.createdAt,
        blog: item,
      };
    });
  });

  const mergedBlogs = friendBlogs.concat(currentUserBlogs);

  return (
    <>
      <FlatList
        data={mergedBlogs}
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
  );
};
