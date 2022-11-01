import { Text, Image, View, StyleSheet } from "react-native";

export const ChatGroup = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://media2.dallasobserver.com/dal/imager/u/magnum/13742578/baroness58a9832.jpg?cb=1649112638",
        }}
        style={styles.image}
      />
      <View style={styles.main}>
        <View style={styles.item}>
          <Text style={styles.name} numberOfLines={1}>
            Floz
          </Text>
          <Text style={styles.subtext}>8:00</Text>
        </View>

        <Text numberOfLines={2} style={styles.subtext}>
          Hi What's Up?Hi What's Up?Hi What's Up?Hi What's Up?Hi What's Up?Hi
          What's Up?Hi What's Up?Hi What's Up?Hi What's Up?Hi What's Up?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    height: 100,
  },
  main: {
    flex: 1,
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  item: { flexDirection: "row" },
  name: { flex: 1, fontWeight: "bold" },
  subtext: { color: "gray" },
  image: { width: 100, height: 100, marginRight: 10, borderRadius: 20 },
});
