import { Dimensions, Platform, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { PoppinsBoldText, PoppinsText } from "../../components/StyledText";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { SEO } from "../../components/SEO";
import { TourButtonContainer } from "../../components/TourButtonContainer";
import GradientBackground from "../../components/GradientBackground";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import {
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from "rn-tourguide";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";
import ConnectWallet from "../../components/ConnectWallet";
import { useRecoilState } from "recoil";
import { connectedWalletState } from "../../state/globalStateKeys";
import { router } from "expo-router";

export default function LandingScreen() {
  const { device, isDesktop, isMobile } = useDeviceSize();
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
    tourKey,
  } = useTourGuideController("landing");
  const [walletAddress, _] = useRecoilState(connectedWalletState);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <SEO title={"Home"} description={"Play to earn crypto"} />

      <SafeAreaView style={styles.container}>
        {showLoginModal && (
          <ConnectWallet
            visible={showLoginModal}
            setVisible={setShowLoginModal}
          />
        )}
        <View style={styles.imageContainer}>
          <View style={[styles[`${device}-bullImageContainer`]]}>
            <Image
              style={[styles[`${device}-bullImage`]]}
              source={require("../../assets/images/landing/green_bull_suit.png")}
              contentFit="contain"
              transition={1000}
            />
          </View>
          <View style={[styles.centerContainer]}>
            {isMobile && (
              <TourButtonContainer tourKey={tourKey} start={start} />
            )}
            <PoppinsBoldText style={[styles[`${device}-header`]]}>
              UP OR DOWN PREDICT & WIN
            </PoppinsBoldText>
            <View
              style={[
                styles.characterContainer,
                styles[`${device}-baseCoinContainer`],
              ]}
            >
              <Image
                style={styles.baseCoinImage}
                source={require("../../assets/images/landing/btc-base-coin.png")}
                contentFit="contain"
                transition={1000}
              />
            </View>
            <TourGuideZone
              zone={5}
              shape="rectangle"
              tourKey={tourKey}
              text={"Winnings"}
            >
              <Button
                onPress={() => {
                  if (walletAddress === "") {
                    setShowLoginModal(true);
                  } else {
                    router.replace("/game");
                  }
                }}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#FF9029", "#FF7B00"]}
                  style={styles.baseButton}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                  <PoppinsText
                    style={{
                      fontSize: 28,
                      fontWeight: "700",
                      paddingRight: 12,
                      color: "#fff",
                    }}
                  >
                    Play to Earn Crypto
                  </PoppinsText>
                  <FontAwesome name="arrow-right" color={"white"} size={28} />
                </LinearGradient>
              </Button>
            </TourGuideZone>
          </View>
          <View style={[styles[`${device}-bearImageContainer`]]}>
            <Image
              style={styles.bearImage}
              source={require("../../assets/images/landing/red_bear_suit.png")}
              contentFit="contain"
              transition={1000}
            />
          </View>
          {!isMobile && <TourButtonContainer tourKey={tourKey} start={start} />}
        </View>

        <GradientBackground />
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/images/landing/lights.png")}
          contentFit="cover"
          transition={1000}
        />
        {isDesktop && (
          <>
            <Image
              style={styles.btcIconRight}
              source={require("../../assets/images/landing/btc-right.png")}
              contentFit="cover"
              transition={1000}
            />
            <Image
              style={styles.btcIconBottomRight}
              source={require("../../assets/images/landing/btc-bottom-right.png")}
              contentFit="cover"
              transition={1000}
            />
            <Image
              style={styles.btcIconTopight}
              source={require("../../assets/images/landing/btc-top-right.png")}
              contentFit="cover"
              transition={1000}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
}
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingBottom: 14,
  },
  "mobile-header": {
    fontSize: 60,
    textAlign: "center",
    width: "100%",
    maxWidth: 310, //deviceWidth * 0.3,
    lineHeight: 52.5,
    color: "#fff",
  },
  "tablet-header": {
    fontSize: 84,
    textAlign: "center",
    width: "100%",
    maxWidth: 435,
    lineHeight: 62,
    color: "#fff",
  },
  "desktop-header": {
    fontSize: 122,
    textAlign: "center",
    width: "100%",
    maxWidth: 522,
    lineHeight: 101,
    color: "#fff",
  },
  "mobile-baseCoinContainer": {
    position: "relative",
    // top: 30,
  },
  "tablet-baseCoinContainer": {
    position: "absolute",
    top: 70, //248
  },
  "desktop-baseCoinContainer": {
    position: "absolute",
    top: 200,
  },
  "mobile-bullImage": {
    flex: 1,
    maxWidth: 450,
    maxHeight: 719,
    resizeMode: "contain",
    ...StyleSheet.absoluteFillObject,
  },
  "tablet-bullImage": {
    flex: 1,
    maxWidth: 450,
    maxHeight: 719,
    resizeMode: "contain",
    ...StyleSheet.absoluteFillObject,
  },
  "desktop-bullImage": {
    flex: 1,
    maxWidth: 450,
    maxHeight: 719,
    resizeMode: "contain",
    marginLeft: "auto",
    ...StyleSheet.absoluteFillObject,
  },
  "mobile-bullImageContainer": {
    position: "absolute",
    width: deviceWidth * 0.33,
    height: "100%",
    bottom: 0,
    left: 25,
    flex: 1,
    zIndex: -1,
  },
  "tablet-bullImageContainer": {
    position: "absolute",
    width: deviceWidth * 0.33,
    height: "100%",
    bottom: 0,
    left: 50,
    flex: 1,
    zIndex: -1,
  },
  "desktop-bullImageContainer": {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  characterContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bearImage: {
    flex: 1,
    maxWidth: 376,
    maxHeight: 719,
    resizeMode: "contain",
    ...StyleSheet.absoluteFillObject,
  },
  "mobile-bearImageContainer": {
    position: "absolute",
    bottom: 0,
    right: 25,
    width: deviceWidth * 0.33,
    height: "100%",
    zIndex: -1,
  },
  "tablet-bearImageContainer": {
    position: "absolute",
    bottom: 0,
    right: 50,
    width: deviceWidth * 0.33,
    height: "100%",
    zIndex: -1,
  },
  "desktop-bearImageContainer": {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },

  baseCoinImage: {
    flex: 1,
    // maxWidth: 466,
    // maxHeight: 400,
    // height: "auto"
    resizeMode: "contain",
    ...StyleSheet.absoluteFillObject,
  },

  baseButton: {
    padding: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    maxWidth: 406,
  },
  btcIconRight: {
    width: 296,
    height: 240,
    zIndex: -1,
    position: "absolute",
    top: 176,
    left: -38,
  },
  btcIconBottomRight: {
    width: 296,
    height: 178,
    zIndex: -1,
    position: "absolute",
    bottom: -60,
    right: 0,
  },
  btcIconTopight: {
    width: 296,
    height: 178,
    zIndex: -1,
    position: "absolute",
    top: 20,
    right: 120,
  },
});
