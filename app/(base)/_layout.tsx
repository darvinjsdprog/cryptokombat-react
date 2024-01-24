import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import DrawerHeader from "../../components/Header/DrawerHeader";
import { StyleSheet } from "react-native";
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from "rn-tourguide";
import { Tooltip } from "../../components/Tour/Tooltip";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawer from "../../components/Drawer/CustomDrawer";
import { RecoilRoot, useRecoilState } from "recoil";
import { configureApollo } from "../../apolloConfig";

import { ApolloProvider } from "@apollo/react-hooks";
import { useStorage } from "../../hooks/useStorage";
import {
  USER_KEY,
  USER_PREFERENCES_KEY,
  webToken,
} from "../../state/storageKeys";
import { RootSiblingParent } from "react-native-root-siblings";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GLOBAL_USER_PREFERENCES_STATE,
  GLOBAL_USER_STATE,
} from "../../state/globalStateKeys";

export default function RootLayout() {
  const [userinfo, setUserInfo] = useRecoilState(GLOBAL_USER_STATE);
  const [userPrefrences, setUserPrefrences] = useRecoilState(
    GLOBAL_USER_PREFERENCES_STATE
  );
  const { getObjectData } = useStorage();

  async function setInitialUSerDataAndPreferences() {
    const userInfo = await getObjectData(USER_KEY);
    setUserInfo(userInfo?.user);
    setUserPrefrences(await getObjectData(USER_PREFERENCES_KEY));
  }

  useEffect(() => {
    setInitialUSerDataAndPreferences();
  }, []);

  return (
    <>
      <Slot />
    </>
  );
}
