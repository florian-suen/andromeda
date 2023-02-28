import { useContext, useEffect } from "react";
import { Animated, FlatList } from "react-native";
import { Message } from "../../Message/Message";
import { UserContext } from "../GroupChatCompound";

export const Messages = () => {
  const {
    messageTiming: { transformY },
    inputSelector: { openSelector },
    messages: { messages },
  } = useContext(UserContext);

  useEffect(() => {
    const translateYTiming = () =>
      Animated.timing(transformY.current, {
        toValue: -95,
        duration: 300,
        useNativeDriver: true,
      }).start();
    if (openSelector) translateYTiming();
  }, [openSelector]);

  return (
    <Animated.View
      style={{
        marginBottom: 55,
        transform: [{ translateY: transformY.current }],
      }}
    >
      <FlatList
        initialNumToRender={5}
        maxToRenderPerBatch={1}
        inverted
        data={messages}
        renderItem={({ item }) => (
          <Message openSelector={openSelector} message={item} />
        )}
      ></FlatList>
    </Animated.View>
  );
};
