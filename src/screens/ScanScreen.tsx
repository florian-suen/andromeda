import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { QRCodeProps } from "./QRCodeScreen";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { BlurView } from "expo-blur";
import { Button } from "react-native-paper";
export const ScanScreen = () => {
  const [loading, setLoading] = useState(true);
  const [scanData, setScanData] = useState<QRCodeProps | string | null>(null);
  const [permission, setPermission] = useState(true);
  const { height, width } = Dimensions.get("window");
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [ratio, setRatio] = useState("4:3");
  const [cameraMargin, setCameraMargin] = useState(0);
  const screenRatio = height / width;
  const camRef = useRef<Camera>(null);

  const cameraReadyHandler = async () => {
    if (!isRatioSet) {
      await getRealRatio();
    }
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    try {
      const { status, granted } = await Camera.requestCameraPermissionsAsync();
      console.log(`Status ${status} Granted:${granted}`);

      if (status === "granted") {
        console.log("access granted");
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (e) {
      console.log(`Camera Permission Error: ${e}`);
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const getRealRatio = async () => {
    let desiredRatio = "4:3";
    if (Platform.OS === "android") {
      const supportedRatio: string[] =
        await camRef.current!.getSupportedRatiosAsync();
      let minDistance: string | null = null;
      let distances: { [t: string]: number } = {};
      let realRatios: { [t: string]: number } = {};

      for (const ratio of supportedRatio) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio;
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      desiredRatio = minDistance!;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      setCameraMargin(remainder);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Requesting Permission</Text>
      </View>
    );
  if (scanData) {
    if (typeof scanData === "object")
      return (
        <LinearGradient
          style={styles.linearGradient}
          colors={[Colors.buttonProfile, Colors.tertiary]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1.5, y: 1 }}
        >
          <BlurView intensity={15} style={styles.textInfo}>
            <Image style={styles.imageInfo} source={{ uri: scanData.image }} />
            <Text style={styles.text}>{scanData.name}</Text>
          </BlurView>

          <Button
            mode="contained"
            textColor={Colors.qrCode}
            style={{ borderRadius: 3 }}
            onPress={() => {}}
          >
            Save QR Code
          </Button>
        </LinearGradient>
      );
    else {
      return (
        <>
          <View style={styles.cameraContainer}>
            <Text>{scanData}</Text>
          </View>

          <Button
            onPress={() => {
              setScanData(null);
            }}
          >
            scan again
          </Button>
        </>
      );
    }
  }
  if (permission && !scanData)
    return (
      <View style={styles.cameraContainer}>
        <Camera
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onCameraReady={cameraReadyHandler}
          ratio={ratio}
          ref={camRef}
          type={CameraType.back}
          style={[styles.camera, { marginVertical: cameraMargin }]}
          onBarCodeScanned={({ type, data }) => {
            if (BarCodeScanner.Constants.BarCodeType.qr === type) {
              try {
                const _data = JSON.parse(data);
                if ("inviteId" in _data && "name" in _data) {
                  setScanData(_data);
                }
              } catch (e) {
                console.log(`Scan error:${e}`);
                setScanData((e as Error).message);
              }
            }
          }}
        ></Camera>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>Awaiting...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    backgroundColor: "#000",
    justifyContent: "center",
    flex: 1,
  },
  camera: { flex: 1 },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageInfo: {
    width: 50,
    height: 50,
    margin: 10,
    marginBottom: 8,
    borderRadius: 5,
    marginRight: 22,
  },
  text: { fontFamily: "Exo2", color: Colors.accent },
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
});
