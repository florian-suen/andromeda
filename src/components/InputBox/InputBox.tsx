import { View, Text, StyleSheet, TextInput, Animated } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const InputBox = () => {
  const [inputText, setInputText] = useState("");
  const inputOpacity = new Animated.Value(0);
  const inputScale = new Animated.Value(0);
  const animateInput = useRef(true);

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
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    animateInput.current =
      inputText.length === 0 && animateInput.current === true;
    const shouldAnimate = animateInput.current && inputText.length === 1;

    if (shouldAnimate)
      scaleTiming(), opacityTiming(), (animateInput.current = false);
  }, [inputText]);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
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
        color={"white"}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2E3D59",
    padding: 5,
    paddingHorizontal: 6,
    borderColor: "black",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderRadius: 5,
    marginEnd: 5,
    marginLeft: 5,
    paddingLeft: 5,
  },
  fading: {},
  plusCircleIcon: { paddingRight: 5 },
  sendIcon: {
    minWidth: 26,
  },
});