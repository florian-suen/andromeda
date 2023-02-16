import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useRef } from "react";

import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import colors from "../../constants/Colors";

export const Icons = {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
};

type Icons = typeof Icons;

export const Icon = ({
  type,
  name,
  color,
  size = 24,
  style,
}: {
  type: Icons[keyof Icons];
  name: any;
  color: string;
  size?: number;
  style?: StyleProp<ImageStyle | TextStyle | ViewStyle>;
}) => {
  const fontSize = 24;
  const Tag = type;

  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};
