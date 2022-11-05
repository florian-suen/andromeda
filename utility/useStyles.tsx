import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export function useThemeColor(options: { [t: string]: any }) {
  const { colors } = useTheme();

  for (const [key, values] of Object.entries(options)) {
    for (const [styleproperty, value] of Object.entries(values)) {
      switch (value) {
        case "primary":
          options[key][styleproperty] = colors.primary;
          break;
        case "background":
          options[key][styleproperty] = colors.background;
          break;
        case "card":
          options[key][styleproperty] = colors.card;
          break;
        case "text":
          options[key][styleproperty] = colors.text;
          break;
        case "border":
          options[key][styleproperty] = colors.border;
          break;
        case "notification":
          options[key][styleproperty] = colors.notification;
          break;
      }
    }
  }

  return options;
}
