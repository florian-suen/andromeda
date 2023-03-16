import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { ContactsComponent } from "../components/Contacts/Contacts";
import { useAppSelector } from "../../utility/useReduxHooks";
import { BlurView } from "expo-blur";
export const ContactScreen = () => {
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
  const isSelectable = false;
  const scrollY = useRef(new Animated.Value(0)).current;
  const createGroupOpacity = useRef(new Animated.Value(0)).current;
  const contactList = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter(
    (item) =>
      item.requestStatus === "ACCEPTED" &&
      item.userContact.requestStatus === "ACCEPTED"
  );

  useEffect(() => {
    const createGrpOpaTiming = Animated.timing(createGroupOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    });

    const revertGrpOpaTiming = Animated.timing(createGroupOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });

    if (selectedUserId.length) createGrpOpaTiming.start();
    if (!selectedUserId.length) revertGrpOpaTiming.start();
  }, [selectedUserId]);

  return (
    <>
      <Animated.FlatList
        style={{ marginTop: 10 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={contactList}
        renderItem={({ item, index }) => {
          const isSelected = selectedUserId.includes(item.friend.id);
          const ITEM_SIZE = 80;
          const scale = scrollY.interpolate({
            inputRange: [
              -1,
              0,
              ITEM_SIZE * (index + 0.9),
              ITEM_SIZE * (index + 4),
            ],
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                opacity,
                transform: [{ scale }],
              }}
            >
              <BlurView
                intensity={20}
                style={{
                  margin: 5,
                  marginHorizontal: 12,
                  borderRadius: 3,
                }}
              >
                <ContactsComponent
                  contact={item}
                  isSelectable={isSelectable}
                  isSelected={isSelected}
                />
              </BlurView>
            </Animated.View>
          );
        }}
      ></Animated.FlatList>
    </>
  );
};
