import {
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { ContactType } from "../../redux/contactList/types";

type RootStackParamList = {
  ContactProfile: { contactId: string };
};

export type Dispatch = ReturnType<typeof useAppDispatch>;

export const ContactsComponent = ({
  contact,
  isSelected = false,
  isSelectable,
}: {
  contact: ContactType;
  isSelected: boolean;
  isSelectable: boolean;
}) => {
  const image = contact.friend.image ? contact.friend.image : undefined;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
          navigation.navigate("ContactProfile", { contactId: contact.id });
        }}
        style={({ pressed }) => [pressed ? styles.pressed : null]}
      >
        <View
          style={{
            padding: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: "#18202e",
          }}
        >
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
                  {contact.friend.username}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
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
    height: 60,
    alignItems: "center",
    justifyContent: "center",
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
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
  },
});
