import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { QRCodeProps } from "./QRCode";

const ScanScreen = () => {
  const [loading, setLoading] = useState(true);
  const [scanData, setScanData] = useState<QRCodeProps>();
  const [permission, setPermission] = useState(true);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    try {
      const { status, granted } =
        await BarCodeScanner.requestPermissionsAsync();
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

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Requesting Permission</Text>
      </View>
    );
  if (scanData)
    return (
      <>
        <View style={styles.container}>
          <Text>{scanData.name}</Text>
        </View>

        <Button
          title="scan again"
          color={"royalblue"}
          onPress={() => {
            setScanData(undefined);
          }}
        ></Button>
      </>
    );

  if (permission)
    return (
      <BarCodeScanner
        style={[styles.container]}
        onBarCodeScanned={({ type, data }) => {
          try {
            console.log(type);
            console.log(data);
            let _data = JSON.parse(data);
            setScanData(_data);
          } catch (e) {
            console.log(e0);
          }
        }}
      ></BarCodeScanner>
    );

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
