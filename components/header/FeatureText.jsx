import { Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function FeatureText({ style }) {
  return (
    <Text style={[styles.mainText, style]}>
      Reminde<Text style={styles.rx}>RX</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontFamily: Fonts.main,
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    color: "white",
  },

  rx: {
    color: Color.purpleColor,
  },
});
