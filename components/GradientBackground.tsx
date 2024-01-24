import { StyleSheet } from "react-native";
import { gradientColor } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground() {
  return (
    <LinearGradient
      colors={gradientColor}
      style={styles.background}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    ></LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    zIndex: -1,
  },
});
