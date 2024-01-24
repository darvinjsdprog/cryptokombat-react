import { useEffect, useRef } from "react";
import { View } from "../components/Themed";
import { Animated, Easing, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { PoppinsText } from "./StyledText";
import Favicon from "../assets/images/icons/favicon.svg";
import { greenColor, redColor } from "../constants/Colors";
import { useDeviceSize } from "../hooks/useDeviceSize";
export type PoolAvatarProps = {
  avatar: String;
  countryCode: String;
  poolNumber: String;
  color: "Red" | "Green";
};

export default function PoolAvatar({
  avatar,
  countryCode,
  poolNumber,
  color,
}: PoolAvatarProps) {
  const { isMobile, isTablet, isDesktop, device } = useDeviceSize();
  const spinValue = useRef(new Animated.Value(0)).current;

  const bgColor = color === "Green" ? greenColor : redColor;

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [spinValue]);
  const rotateY = spinValue.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: ["0deg", "0deg", "360deg"],
  });

  return (
    <>
      <View style={[styles.container]}>
        <Animated.View style={[{ transform: [{ rotateY: rotateY }] }]}>
          <Avatar
            rounded
            size={isDesktop ? "medium" : isTablet ? "medium" : "small"}
            containerStyle={[styles.circleAvatar, { borderColor: bgColor }]}
            overlayContainerStyle={{ backgroundColor: "#0C0D13" }}
            avatarStyle={{ width: "100%", height: "100%" }}
            source={!avatar ? require("../assets/images/favicon.png") : avatar}
          />
          {!isMobile && countryCode && (
            <Avatar
              rounded
              size={"small"}
              containerStyle={styles.avatarFlag}
              //@ts-ignore
              source={`https://flagsapi.com/${countryCode}/shiny/64.png`}
            />
          )}
          {isDesktop && (
            <View style={styles.flex}>
              <PoppinsText style={[styles.text, { color: bgColor }]}>
                {poolNumber}
              </PoppinsText>
              <Favicon width={20} height={20} />
            </View>
          )}
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    flex: 1,
    padding: 8,
  },
  circleAvatar: {
    borderWidth: 3,
  },
  avatarFlag: {
    position: "absolute",
    top: -10,
    left: 25,
    zIndex: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
