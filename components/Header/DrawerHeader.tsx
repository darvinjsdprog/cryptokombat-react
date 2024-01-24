import { StyleSheet } from "react-native";

import { View } from "../Themed";
import {
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import TrailingActions from "./TrailingActions";
import AppLogo from "./AppLogo";
import SocialMediaContainer from "../SocialMediaContainer";
import GradientBackground from "../GradientBackground";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { useRecoilState } from "recoil";
import { connectedWalletState } from "../../state/globalStateKeys";
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";

type DrawerHeaderProps = {
  navigation?: DrawerNavigationProp<ParamListBase, string, undefined>;
  route?: RouteProp<ParamListBase>;
  options?: DrawerNavigationOptions;
};

export default function DrawerHeader({
  navigation,
  route,
  options,
}: DrawerHeaderProps) {
  const { device, isDesktop } = useDeviceSize();
  const { connectedWallet } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(connectedWallet !== "");
  // const indexPage = isLoggedIn ? "/game" : "/";

  useEffect(() => {
    setIsLoggedIn(connectedWallet !== "");
  }, [connectedWallet]);

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <GradientBackground />
        {isDesktop && <SocialMediaContainer style={{ paddingLeft: 24 }} />}
        <AppLogo isLoggedIn={isLoggedIn} />
        <TrailingActions navigation={navigation} />
      </View>
    );
  }

  return (
    <View style={styles.secondcontainer}>
      <GradientBackground />
      <View style={styles[`${device}-logo`]}>
        <AppLogo isLoggedIn={isLoggedIn} />
      </View>
      <View style={styles.socialContainer}>
        <SocialMediaContainer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 24,
  },
  secondcontainer: {
    display: "flex",
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  "mobile-logo": {},
  "tablet-logo": {
    position: "absolute",
    width: "100%",
  },
  "desktop-logo": {
    position: "absolute",
    width: "100%",
  },
  socialContainer: {
    marginLeft: "auto",
    paddingLeft: 24,
  },
});
