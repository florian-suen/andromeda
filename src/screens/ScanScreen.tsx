import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  Platform,
} from "react-native";
import { QRCodeProps } from "./QRCodeScreen";

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
      console.log(e);
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
        <>
          <View style={styles.container}>
            <Text>{scanData.inviteId}</Text>
            <Text>{scanData.name}</Text>
            <Text>{scanData.image}</Text>
          </View>

          <Button
            title="scan again"
            color={"royalblue"}
            onPress={() => {
              setScanData(null);
            }}
          ></Button>
        </>
      );
    else {
      return (
        <>
          <View style={styles.cameraContainer}>
            <Text>{scanData}</Text>
          </View>

          <Button
            title="scan again"
            color={"royalblue"}
            onPress={() => {
              setScanData(null);
            }}
          ></Button>
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
                console.log(e);
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
});
