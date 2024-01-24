import { View } from "../components/Themed";
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import UpArrow from "../assets/images/icons/up_arrow.svg";
import { useDeviceSize } from "../hooks/useDeviceSize";
import { useEffect, useRef } from "react";

type ArrowButtonContainerProps = {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
};

export default function ArrowButtonContainer({
  children,
  style,
}: ArrowButtonContainerProps) {
  const { device, isDesktop, isTablet } = useDeviceSize();
  const size = isDesktop ? 160 : isTablet ? 100 : 80;
  const animateValue = useRef(new Animated.Value(size)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animateValue, {
        toValue: size - 20,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start();
  }, [animateValue]);

  return (
    <>
      <View style={[styles[`${device}-container`], style]}>
        <Animated.View style={{ height: animateValue }}>
          {children}
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  "mobile-container": {
    backgroundColor: "#0c0d13e0",
    border: "3px solid",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  "tablet-container": {
    backgroundColor: "#0c0d13e0",
    border: "3px solid",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  "desktop-container": {
    backgroundColor: "#0c0d13e0",
    border: "3px solid",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    height: 160,
  },
});
