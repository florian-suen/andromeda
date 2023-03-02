import { useRef } from "react";
import { Animated } from "react-native";

export type AnimationType = "opacity" | "scale" | "translateX";

type Animation = {
  type: AnimationType;
  startValue: number | Animated.Value;
  toValue: number;
  duration?: number;
  delay?: number;
};

type AnimationValue = {
  timing: () => Animated.CompositeAnimation;
  startValue: Animated.Value;
};

type returnAnimation = {
  [P in Animation["type"]]?: AnimationValue;
};

export const createAnimation = <T extends Animation>(
  list: T[]
): returnAnimation => {
  const startValue = useRef<Animated.Value[]>([]);
  const returnAnimation = list.map((item, index) => {
    typeof item.startValue === "number"
      ? startValue.current.push(new Animated.Value(item.startValue))
      : startValue.current.push(item.startValue);
    const timing = () =>
      Animated.timing(startValue.current[index], {
        toValue: item.toValue,
        duration: item.duration || 500,
        delay: item.delay || 0,
        useNativeDriver: true,
      });
    return {
      [item.type as AnimationType]: {
        timing,
        startValue: startValue.current[index],
      },
    };
  });

  return returnAnimation.reduce((prev, curr) => {
    return { ...prev, ...curr };
  });
};
