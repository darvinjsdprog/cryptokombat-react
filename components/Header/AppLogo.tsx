import { StyleSheet } from "react-native";

import { View } from "../Themed";
import { KronaOneText } from "../StyledText";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useSounds } from "../../hooks/useSounds";

type AppLogoProps = {
  isLoggedIn: boolean;
};

export default function AppLogo({ isLoggedIn }: AppLogoProps) {
  const { device, isDesktop, isMobile } = useDeviceSize();
  const appName = process.env.EXPO_PUBLIC_APP_NAME?.toUpperCase();
  const iconSize = isDesktop ? 50 : 28;
  const { playSound } = useSounds();
  const indexPage = isLoggedIn ? "/game" : "/";

  return (
    <Link
      style={{ flex: 1 }}
      href={indexPage}
      onPress={() => playSound("click")}
    >
      <View style={[styles.container]}>
        <Image
          style={{ width: iconSize, height: iconSize }}
          source={require("../../assets/images/favicon.png")}
          contentFit="contain"
          transition={1000}
        />
        <KronaOneText style={[styles[`${device}-text`]]}>
          {appName}
        </KronaOneText>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  "mobile-text": {
    fontSize: 16,
    color: "#fff",
  },
  "tablet-text": {
    fontSize: 20,
    color: "#fff",
  },
  "desktop-text": {
    fontSize: 28,
    color: "#fff",
  },
});
