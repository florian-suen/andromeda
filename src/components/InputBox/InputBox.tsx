import { View, Text, StyleSheet, TextInput, Animated } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

export const InputBox = () => {
  const [inputText, setInputText] = useState("");
  const inputOpacity = new Animated.Value(0);
  const inputScale = new Animated.Value(0);
  const inputheight = new Animated.Value(0);

  const interpolatedScale = inputheight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  const interpo = inputScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 1],
  });

  useEffect(() => {
    const opacityTiming = () => {
      Animated.timing(inputOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const scaleTiming = () => {
      Animated.timing(inputScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    const heightTiming = () => {
      Animated.timing(inputheight, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    };

    scaleTiming();
    inputText && opacityTiming();
  }, [inputText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={inputText}
        onChangeText={setInputText}
      />
      <MaterialCommunityIcons
        style={styles.plusCircleIcon}
        name="plus-circle-outline"
        size={30}
        color={"red"}
      />
      {inputText ? (
        <Animated.View
          style={{
            width: 22,
            marginRight: 7,
            opacity: inputOpacity,
            transform: [{ scale: interpo }],
          }}
        >
          <Ionicons
            style={styles.sendIcon}
            name="send"
            size={25}
            color={"white"}
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "blue",
    padding: 5,
    paddingHorizontal: 6,
    borderColor: "black",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderRadius: 4,
    marginEnd: 5,
  },
  fading: {},
  plusCircleIcon: { paddingRight: 5 },
  sendIcon: {
    minWidth: 26,
  },
});
