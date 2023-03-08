import {
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { useEffect, useRef } from "react";
import { useThemeColor } from "../../../utility/useStyles";
import { ContactType } from "../../redux/contactList/contactListSlice";

export const ChatContactsComponent = ({
  user,
  isSelected = false,
  onSelectHandler,
  isSelectable,
  chatGroupHandler,
}: {
  user: ContactType["friend"];
  isSelected: boolean;
  isSelectable: boolean;
  onSelectHandler: () => void;
  chatGroupHandler: (user: ContactType["friend"]) => Promise<void>;
}) => {
  const image = user.image ? user.image : undefined;
  const styles = useThemeColor(styleSheet);
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const translateXTiming = Animated.timing(translateX, {
      toValue: 50,
      duration: 500,
      useNativeDriver: true,
    });

    const translateRevertXTiming = Animated.timing(translateX, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    const opacityTiming = Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 280,
      useNativeDriver: true,
    });

    const opacityRevertTiming = Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    });

    if (isSelectable)
      Animated.parallel([translateXTiming, opacityTiming], {
        stopTogether: true,
      }).start();
    if (!isSelectable)
      Animated.parallel([translateRevertXTiming, opacityRevertTiming], {
        stopTogether: true,
      }).start(() => {});
  }, [isSelectable]);
  return (
    <>
      <Pressable
        android_ripple={{ color: "#222b3d" }}
        onPress={() => {
          if (!isSelectable) chatGroupHandler(user);
          if (isSelectable) onSelectHandler();
        }}
        style={({ pressed }) => [pressed ? styles.pressed : null]}
      >
        <View>
          <Animated.View
            style={{
              ...styles.container,
              translateX: translateX,
              position: "relative",
            }}
          >
            <Animated.View
              style={{
                ...styles.circle,
                opacity: opacity,
                position: "absolute",
                left: -53,
                margin: 0,
              }}
            >
              {isSelected && <View style={styles.circleTwo} />}
            </Animated.View>
            <Image
              source={{
                uri: image,
              }}
              style={styles.image}
            />
            <View style={styles.main}>
              <View style={styles.item}>
                <Text style={styles.name} numberOfLines={1}>
                  {user.username}
                </Text>
              </View>
              <Text style={styles.status}>{user.status}</Text>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </>
  );
};

const styleSheet: StyleSheet.NamedStyles<{
  [p: string]: ViewStyle | ImageStyle | TextStyle;
}> = {
  circle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  circleTwo: {
    justifyContent: "flex-start",
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "steelblue",
  },
  pressed: { opacity: 0.7, backgroundColor: "#151b26" },
  container: {
    flexDirection: "row",
    marginVertical: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#18202e",
    backgroundColor: "background",
  },
  main: {
    flex: 1,
  },
  item: { flexDirection: "row" },
  name: { flex: 1, fontWeight: "bold", color: "#DAD5CF", fontSize: 18 },
  status: {
    color: "gray",
    marginRight: 10,
  },
  time: {
    color: "gray",
    marginBottom: 0,
  },
  image: {
    marginLeft: 20,
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 5,
  },
};
