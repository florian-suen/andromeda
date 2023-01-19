import { useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  Button,
} from "react-native";
import * as FileSystem from "expo-file-system";

import QRCode from "react-native-qrcode-svg";
import { userContext } from "../../utility/userAuth";
import { useAppSelector } from "../../utility/useReduxHooks";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";

export interface QRCodeProps {
  inviteId: string;
  name: string;
}

interface QREncode {
  toDataURL: (callback: (data: string) => void) => void;
}

export const QRCodeScreen = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  let qrCode: QREncode | null = null;
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
            getRef={(qrCode64) => {
              qrCode = qrCode64;
            }}
          />
        </View>
        <View style={styles.info}>
          <Text>Scan QR code to form a contract</Text>
          <Image source={{ uri: currentUser.image }} />
          <Text>{currentUser.username}</Text>
        </View>
        <Button
          title="Save QR Code"
          onPress={async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            status === "granted" && qrCode ? saveQrToDisk(qrCode) : null;
          }}
        />
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

const saveQrToDisk = (qrCode: QREncode) => {
  qrCode.toDataURL((data: string) => {
    const filename = FileSystem.documentDirectory + "my-qr.png";
    FileSystem.writeAsStringAsync(filename, data, {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then((success) => {
        return MediaLibrary.saveToLibraryAsync(filename);
      })
      .then(() => {
        ToastAndroid.show("Saved to Gallery", ToastAndroid.SHORT);
      });
  });
};