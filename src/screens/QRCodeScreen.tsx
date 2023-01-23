import { PropsWithChildren, useContext, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  Button,
} from "react-native";
import * as FileSystem from "expo-file-system";
import ViewShot, { captureScreen } from "react-native-view-shot";
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
  const ref: any = useRef();
  const userAuth = useContext(userContext);
  const payload: QRCodeProps = { inviteId: "Something", name: "New" };
  const currentUser = useAppSelector((state) =>
    state.contacts.contacts.find((item) => item.id === userAuth?.attributes.sub)
  )!;

  const saveImageHandler = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    ref.current.capture().then((uri: any) => {
      status === "granted" &&
        MediaLibrary.saveToLibraryAsync(uri).then(() => {
          ToastAndroid.show("Saved to Gallery", ToastAndroid.SHORT);
        });
    });
  };

  const QRMainComponent = ({ screenshot }: { screenshot: boolean }) => {
    return (
      <View>
        {screenshot ? (
          <LinearGradient
            colors={["purple", "orange"]}
            start={{ x: 0.8, y: 0.35 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.qrCode}>
              {
                <QRCode
                  size={240}
                  color="white"
                  logo={{ uri: currentUser.image }}
                  backgroundColor="transparent"
                  value={JSON.stringify(payload)}
                />
              }
            </View>
            <View style={styles.textInfo}>
              <Text>Scan QR code to form a contract</Text>
              <Image source={{ uri: currentUser.image }} />
              <Text>{currentUser.username}</Text>
            </View>
          </LinearGradient>
        ) : (
          <>
            <View style={styles.qrCode}>
              {
                <QRCode
                  size={240}
                  color="white"
                  logo={{ uri: currentUser.image }}
                  backgroundColor="transparent"
                  value={JSON.stringify(payload)}
                />
              }
            </View>
            <View style={styles.textInfo}>
              <Text>Scan QR code to form a contract</Text>
              <Image source={{ uri: currentUser.image }} />
              <Text>{currentUser.username}</Text>
            </View>
            <Button
              title="Save QR Code"
              onPress={() => {
                saveImageHandler();
              }}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["purple", "orange"]}
        style={styles.linearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 2, y: 1 }}
      >
        <ViewShot
          style={{ position: "absolute", top: -500 }}
          ref={ref}
          options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}
        >
          <QRMainComponent screenshot={true} />
        </ViewShot>
        <QRMainComponent screenshot={false} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrCode: { paddingVertical: 30, paddingHorizontal: 50 },
  linearGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  textInfo: { alignItems: "center" },
});
