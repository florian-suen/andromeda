import { useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ViewShot, { captureScreen } from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { useAppSelector } from "../../utility/useReduxHooks";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import Colors from "../constants/Colors";
import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import Toast from "react-native-root-toast";

export interface QRCodeProps {
  inviteId: string;
  name: string;
  status: string;
  image: string;
}

export const QRCodeScreen = () => {
  const ref: any = useRef();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)!;

  const payload: QRCodeProps = {
    inviteId: currentUser.inviteId[0],
    name: currentUser.username,
    status: currentUser.status,
    image: currentUser.image,
  };

  const saveImageHandler = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    ref.current.capture().then((uri: any) => {
      status === "granted" &&
        MediaLibrary.saveToLibraryAsync(uri).then(() => {
          Toast.show("Saved to Gallery", {
            duration: Toast.durations.LONG,
            position: -60,
            shadow: true,
            backgroundColor: Colors.info,
            textStyle: {
              fontFamily: "Exo2",
            },
          });
        });
    });
  };

  const QRMainComponent = ({ screenshot }: { screenshot: boolean }) => {
    return (
      <View>
        {screenshot ? (
          <LinearGradient
            colors={[Colors.buttonProfile, Colors.tertiary]}
            start={{ x: 0.8, y: 0.35 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.qrCode}>
              {
                <QRCode
                  size={240}
                  color={Colors.qrCode}
                  /*    logo={{ uri: }} */
                  backgroundColor="transparent"
                  value={JSON.stringify(payload)}
                />
              }
            </View>
            <Text
              style={[{ alignSelf: "center", marginBottom: 15 }, styles.text]}
            >
              Scan QR code to add Contact
            </Text>
            <BlurView intensity={15} style={styles.textInfo}>
              <Image
                style={styles.imageInfo}
                source={{ uri: currentUser.image }}
              />
              <Text style={styles.text}>{currentUser.username}</Text>
            </BlurView>
          </LinearGradient>
        ) : (
          <>
            <View style={styles.qrCode}>
              {
                <QRCode
                  size={240}
                  color={Colors.qrCode}
                  /*    logo={{ uri: }} */
                  backgroundColor="transparent"
                  value={JSON.stringify(payload)}
                />
              }
            </View>
            <Text
              style={[{ alignSelf: "center", marginBottom: 15 }, styles.text]}
            >
              Scan QR code to add Contact
            </Text>
            <BlurView intensity={15} style={styles.textInfo}>
              <Image
                style={styles.imageInfo}
                source={{ uri: currentUser.image }}
              />
              <Text style={styles.text}>{currentUser.username}</Text>
            </BlurView>

            <Button
              mode="contained"
              textColor={Colors.qrCode}
              style={{ borderRadius: 3 }}
              onPress={() => {
                saveImageHandler();
              }}
            >
              Save QR Code
            </Button>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.buttonProfile, Colors.tertiary]}
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
  text: { fontFamily: "Exo2", color: Colors.accent },
  qrCode: {
    paddingVertical: 50,
    paddingHorizontal: 4,
  },
  linearGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  textInfo: {
    flexDirection: "row",

    alignItems: "center",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 0.1,
  },
  imageInfo: {
    width: 50,
    height: 50,
    margin: 10,
    marginBottom: 8,
    borderRadius: 5,
    marginRight: 22,
  },
});
