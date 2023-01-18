import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
export interface QRCodeProps {
  name: string;
}

const QRCodeScreen = () => {
  const payload: QRCodeProps = { name: "Something" };

  return (
    <View style={styles.container}>
      <QRCode></QRCode>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
