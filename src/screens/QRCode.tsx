import { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { userContext } from "../../utility/userAuth";
import { useAppSelector } from "../../utility/useReduxHooks";
import { LinearGradient } from "expo-linear-gradient";
import RNFS from "react-native-fs";
import { current } from "@reduxjs/toolkit";
export interface QRCodeProps {
  inviteId: string;
  name: string;
}

export const QRCodeScreen = () => {
  const userAuth = useContext(userContext);
  const payload: QRCodeProps = { inviteId: "Something", name: "New" };
  const currentUser = useAppSelector((state) =>
    state.contacts.contacts.find((item) => item.id === userAuth?.attributes.sub)
  )!;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["purple", "orange"]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.qrCode}>
          <QRCode
            size={250}
            color="white"
            logo={{ uri: currentUser.image }}
            backgroundColor="transparent"
            value={JSON.stringify(payload)}
          />
        </View>
        <View style={styles.info}>
          <Text>Scan QR code to form a contract</Text>
          <Image source={{ uri: currentUser.image }} />
          <Text>{currentUser.username}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  qrCode: { position: "absolute", top: 170 },
  info: { marginTop: 50, alignItems: "center" },
});
