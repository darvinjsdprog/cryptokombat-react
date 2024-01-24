import { StyleSheet, View } from "react-native";
import { PoppinsBoldText } from "../StyledText";
import Profile from "./Profile";
import { Divider } from "react-native-elements";
import DrawerItem from "./DrawerItem";
import Referral from "../../assets/images/icons/referral.svg";
import Support from "../../assets/images/icons/whitesupport.svg";
import Globe from "../../assets/images/icons/globe.svg";
import Notifications from "../../assets/images/icons/notifications.svg";
import Sound from "../../assets/images/icons/sound.svg";
import Predictions from "../../assets/images/icons/predictions.svg";
import Withdrawals from "../../assets/images/icons/withdrawals.svg";
import Deposit from "../../assets/images/icons/deposit.svg";
import SignOut from "../../assets/images/icons/signout.svg";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import SocialMediaContainer from "../SocialMediaContainer";
import { Button } from "../Button";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useWallet } from "../../hooks/useWallet";
import { router } from "expo-router";
import { useRecoilState } from "recoil";
import { GLOBAL_USER_PREFERENCES_STATE } from "../../state/globalStateKeys";
import { UserPreferences } from "../../types/user";
import { useEffect, useState } from "react";
import { useStorage } from "../../hooks/useStorage";
import { USER_PREFERENCES_KEY } from "../../state/storageKeys";

export default function CustomDrawer() {
  const isDrawerOpen = useDrawerStatus() === "open";
  const [userPreferences, setUserPreferences] = useRecoilState<UserPreferences>(
    GLOBAL_USER_PREFERENCES_STATE
  );
  const { storeObject, getObjectData } = useStorage();
  const { disconnectWallet } = useWallet();

  const handleSoundSwitchChange = async (value: boolean) => {
    setUserPreferences({ ...userPreferences, sound: value });
    await storeObject(USER_PREFERENCES_KEY, userPreferences as any);
  };

  if (!isDrawerOpen) {
    return null;
  }

  return (
    <DrawerContentScrollView style={{ padding: 18, flex: 1 }}>
      <Button onPress={() => router.push("/(base)/(drawer)/profile")}>
        <Profile />
      </Button>

      <View style={styles.container}>
        <View>
          <DrawerItem
            url={"/(base)/(drawer)/referrals"}
            icon={<Referral />}
            placeholder={"Referral Program"}
          />
          <DrawerItem
            url={"/(base)/(drawer)/deposits"}
            icon={<Deposit />}
            placeholder={"My Deposits"}
          />
          <DrawerItem
            url={"/(base)/(drawer)/withdrawals"}
            icon={<Withdrawals />}
            placeholder={"My Withdrawals"}
          />
          <DrawerItem
            url={"/(base)/(drawer)/predictions"}
            icon={<Predictions />}
            placeholder={"My Predictions"}
          />
          <DrawerItem
            icon={<Sound />}
            placeholder={"Sound"}
            isToggable={true}
            showTrailing={false}
            onChangeToggle={handleSoundSwitchChange}
            toggleValue={userPreferences?.sound ?? true}
          />
          {/* <DrawerItem
            url={""}
            icon={<Notifications />}
            placeholder={"Notifications"}
            isToggable={true}
            showTrailing={false}
          />
          <DrawerItem
            url={""}
            icon={<Globe />}
            placeholder={"Language"}
            isPicker={true}
            showTrailing={false}
          />
          <DrawerItem
            url={""}
            icon={<Support />}
            placeholder={"Live Support"}
          /> */}
        </View>
        <View style={styles.walletContainer}>
          <DrawerDivider />
          <DrawerItem
            url={null}
            icon={<SignOut />}
            placeholder={"Disconnect Wallet"}
            showTrailing={false}
            onPress={async () => await disconnectWallet()}
          />
        </View>
        <SocialMediaContainer
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 12,
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

type DrawerDividerProps = {
  width?: number;
};

export function DrawerDivider({ width }: DrawerDividerProps) {
  return <Divider color="#FFFFFF1A" width={width} style={{ paddingTop: 12 }} />;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "95%",
  },
  baseItemContainer: {
    display: "flex",
    flexDirection: "column",
  },
  walletContainer: {
    marginTop: "auto",
  },
});
