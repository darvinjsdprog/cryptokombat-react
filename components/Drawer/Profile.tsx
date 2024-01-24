import { View, StyleSheet } from "react-native";
import { Avatar, Divider } from "react-native-elements";
import { PoppinsBoldText, PoppinsText } from "../StyledText";
import { DrawerDivider } from "./CustomDrawer";
import { useWallet } from "../../hooks/useWallet";
import ProfileAvatar from "../ProfileAvatar";
import { useStorage } from "../../hooks/useStorage";
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { USER_KEY } from "../../state/storageKeys";
import { useRecoilState } from "recoil";
import { GLOBAL_USER_STATE } from "../../state/globalStateKeys";

type ProfileProps = {
  avatar: String;
  name: String;
};

export default function Profile() {
  const { connectedWallet } = useWallet();
  // const { getObjectData } = useStorage();
  const counter = connectedWallet?.length ?? 0;
  const wallet = `${connectedWallet?.substring(
    0,
    5
  )}...${connectedWallet?.substring(counter - 5, counter)}`;
  const [user, setUser] = useState<User>();
  const [userGlobalState, _] = useRecoilState(GLOBAL_USER_STATE);

  const name = userGlobalState?.nickname
    ? userGlobalState?.nickname
    : [userGlobalState?.firstName, userGlobalState?.lastName].join(" ").trim();

  return (
    <View style={styles.constainer}>
      <View style={styles.content}>
        <ProfileAvatar url={user?.avatar} size={"large"} />
        <View style={styles.detail}>
          <PoppinsText style={styles.welcome}>Welcome,</PoppinsText>
          <PoppinsBoldText style={styles.title}>{name}</PoppinsBoldText>
        </View>
      </View>
      <DrawerDivider />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 12,
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    paddingLeft: 8,
  },
  welcome: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    opacity: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
