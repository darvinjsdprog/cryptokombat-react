import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../Themed";
import {
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Wallet from "../../assets/images/icons/wallet.svg";
import Reload from "../../assets/images/icons/reload.svg";
import { hoveredStyle } from "../../constants/Styles";
import { Button } from "../Button";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { router } from "expo-router";

type TrailingActionsProps = {
  navigation?: DrawerNavigationProp<ParamListBase, string, undefined>;
  route?: RouteProp<ParamListBase>;
  options?: DrawerNavigationOptions;
};

export default function TrailingActions({
  navigation,
  route,
  options,
}: TrailingActionsProps) {
  const { isDesktop, isTablet, isMobile } = useDeviceSize();
  const iconSize = isDesktop ? 32 : isTablet ? 24 : 20;
  return (
    <View style={styles.container}>
      {!isMobile && (
        <Button style={styles.separator} onPress={() => router.push("/game")}>
          <Reload width={iconSize} height={iconSize} />
        </Button>
      )}
      <Button style={styles.separator} onPress={() => null}>
        <Wallet width={iconSize} height={iconSize} />
      </Button>
      <Button
        onPress={() => {
          navigation?.openDrawer();
        }}
        style={{ paddingLeft: 20 }}
      >
        <Feather
          name="menu"
          backgroundColor={"transparent"}
          size={iconSize}
          color="white"
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  separator: {
    // paddingHorizontal: 20,
    // paddingLeft: "20%",
    // paddingRight: "20%",
  },
});
