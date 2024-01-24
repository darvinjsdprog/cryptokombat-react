import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import DrawerHeader from "../components/Header/DrawerHeader";
import { StyleSheet } from "react-native";
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from "rn-tourguide";
import { Tooltip } from "../components/Tour/Tooltip";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawer from "../components/Drawer/CustomDrawer";
import { RecoilRoot } from "recoil";
import { configureApollo } from "../apolloConfig";

import { ApolloProvider } from "@apollo/react-hooks";
import { useStorage } from "../hooks/useStorage";
import { webToken } from "../state/storageKeys";
import { RootSiblingParent } from "react-native-root-siblings";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    KronaOne: require("../assets/fonts/KronaOne-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [jwt, setjwt] = useState<String | null>(null);
  const { getData } = useStorage();
  // let jwt;

  // // Ensure we import the CSS for Tailwind so it's included in hot module reloads.
  // const ctx = require.context(
  //   // If this require.context is not inside the root directory (next to the package.json) then adjust this file path
  //   // to resolve correctly.
  //   "./node_modules/.cache/expo/tailwind"
  // );
  // if (ctx.keys().length) ctx(ctx.keys()[0]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    const init = async () => {
      setjwt(await getData(webToken));
    };
    init();
    if (error) throw error;
  }, [error, jwt]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const client = configureApollo(jwt);

  return (
    //@ts-ignore
    <ApolloProvider client={client}>
      <RootLayoutNav />
    </ApolloProvider>
  );
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DarkTheme}>
      <RecoilRoot>
        <TourGuideProvider
          {...{ tooltipStyle: styles.tourContainer, tooltipComponent: Tooltip }}
          preventOutsideInteraction
          verticalOffset={-200}
          wrapperStyle={{ right: 0 }}
        >
          <RootSiblingParent>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Drawer
                initialRouteName="game"
                drawerContent={(props) => <CustomDrawer />}
                screenOptions={{
                  drawerPosition: "right",
                  drawerStyle: styles.drawerContainer,
                  swipeEnabled: false,
                  header: ({ navigation, route, options }) => {
                    return <DrawerHeader navigation={navigation} />;
                  },
                }}
              />
              <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </GestureHandlerRootView>
          </RootSiblingParent>
        </TourGuideProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tourContainer: {
    backgroundColor: "#161616",
    borderRadius: 10,
    border: "2px solid #FF9029",
    maxWidth: 500,
    right: "8%",
  },
  drawerContainer: {
    // overflowX: "none"
    // overflowY: "scroll",
    // width: 400,
    // maxWidth: "80%",
  },
});
