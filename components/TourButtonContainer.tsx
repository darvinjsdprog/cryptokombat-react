import React from "react";
import Web3 from "../assets/images/icons/web3.svg";
import Cube from "../assets/images/icons/cube.svg";
import Proccess from "../assets/images/icons/proccess.svg";
import Secure from "../assets/images/icons/secure.svg";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import { useDeviceSize } from "../hooks/useDeviceSize";
import { TourGuideZone, TourGuideZoneByPosition } from "rn-tourguide";
import { Button } from "./Button";

type TourButtonContainerProps = {
  tourKey: string;
  start(index?: number): void;
};

export function TourButtonContainer({
  tourKey,
  start,
}: TourButtonContainerProps) {
  const { device, isMobile } = useDeviceSize();
  const mobileSize = isMobile ? 60 : 80;
  return (
    <View style={[styles[`${device}-container`]]}>
      <TourGuideZone
        zone={1}
        shape={"rectangle_and_keep"}
        tourKey={tourKey}
        style={styles.flex}
        keepTooltipPosition
        text={"Web3 Dapp"}
        maskOffset={800}
        tooltipBottomOffset={600}
      >
        <Button
          onPress={() => {
            start();
          }}
        >
          <Web3 width={mobileSize} height={mobileSize} />
        </Button>
      </TourGuideZone>
      <TourGuideZone
        zone={2}
        shape="rectangle"
        tourKey={tourKey}
        style={styles.flex}
        text={"Blockchain polygon MATIC"}
      >
        <Button
          onPress={() => {
            start(2);
          }}
        >
          <Cube width={mobileSize} height={mobileSize} style={styles.flex} />
        </Button>
      </TourGuideZone>
      <TourGuideZone
        zone={3}
        shape="rectangle"
        tourKey={tourKey}
        style={styles.flex}
        text={"Decentralized 100%"}
      >
        <Button
          onPress={() => {
            start(3);
          }}
        >
          <Proccess
            width={mobileSize}
            height={mobileSize}
            style={styles.flex}
          />
        </Button>
      </TourGuideZone>
      <TourGuideZone
        zone={4}
        shape="rectangle"
        tourKey={tourKey}
        style={styles.flex}
        text={"Secure"}
      >
        <Button
          onPress={() => {
            start(4);
          }}
        >
          <Secure width={mobileSize} height={mobileSize} style={styles.flex} />
        </Button>
      </TourGuideZone>
    </View>
  );
}

const styles = StyleSheet.create({
  "mobile-container": {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingBottom: 25,
    // marginHorizontal: "auto",
  },
  "tablet-container": {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: 20,
    marginVertical: "auto",
    height: "100%",
    maxHeight: 560,
  },
  "desktop-container": {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: 20,
    marginVertical: "auto",
    height: "100%",
    maxHeight: 560,
  },
  flex: {
    flex: 1,
  },
});
