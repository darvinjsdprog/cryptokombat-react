import { Animated, Easing, StyleSheet, View } from "react-native";
import { PoppinsBoldText, PoppinsText } from "./StyledText";
import UpChevron from "../assets/images/icons/chevron_up.svg";
import DownChevron from "../assets/images/icons/chevron_down.svg";
import Favicon from "../assets/images/icons/favicon.svg";
import PoolAvatar, { PoolAvatarProps } from "./PoolAvatar";
import { blackColor, greenColor, redColor } from "../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import { useDeviceSize } from "../hooks/useDeviceSize";
import { useEffect, useRef, useState } from "react";

export type PoolTreasuryContainerProps = {
  action: "Up" | "Down";
  poolTreasury: String;
  players: number;
  avatars: PoolAvatarProps[];
  isWinner?: Boolean;
  showResultBanner?: Boolean;
  winAmount?: String;
};

export default function PoolTreasuryContainer({
  action,
  poolTreasury,
  players,
  avatars,
  showResultBanner = false,
  winAmount,
  isWinner = true,
}: PoolTreasuryContainerProps) {
  const { device, isMobile, isDesktop, isTablet } = useDeviceSize();
  const color = action === "Up" ? greenColor : redColor;
  const containerRef = useRef<any>();
  const initialWidth = isTablet ? 66 : 50;
  const [width, setWidth] = useState<number>(initialWidth);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);

    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnNumber = Math.floor(width / initialWidth);
  const bannerFontSize = isDesktop ? 50 : isTablet ? 32 : 20;
  const bannerColor = isWinner ? greenColor : redColor;

  const animateValue = useRef(new Animated.Value(bannerFontSize)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animateValue, {
        toValue: bannerFontSize - 10,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start();
  }, [animateValue]);

  return (
    <View
      ref={containerRef}
      style={[styles[`${device}-container`], { borderColor: color }]}
    >
      <View style={{ padding: 8 }}>
        <View style={styles.flex}>
          <PoppinsText
            style={[styles[`${device}-headerText`], { color: color }]}
          >
            {action} pool treasurry {action === "Up" && " "}
          </PoppinsText>
          {action === "Up" && <UpChevron width={isDesktop ? 20 : 12} />}
          {action === "Down" && <DownChevron width={isDesktop ? 20 : 12} />}
        </View>
        <View style={styles[`${device}-detailContainer`]}>
          <View style={styles.flex}>
            <PoppinsText
              style={[styles[`${device}-poolText`], { color: color }]}
            >
              {poolTreasury}
            </PoppinsText>
            {isDesktop && <Favicon width={30} />}
          </View>

          <View style={styles[`${device}-playersContainer`]}>
            <PoppinsText style={styles[`${device}-detailText`]}>
              players
            </PoppinsText>
            <PoppinsText
              style={[styles[`${device}-numberText`], { color: color }]}
            >
              {players}
            </PoppinsText>
          </View>
        </View>
      </View>
      {!showResultBanner && (
        <FlatList
          key={`${device}-${columnNumber}`}
          style={[
            styles.avatarContainer,
            isDesktop ? { borderTopColor: color } : {},
          ]}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          data={avatars}
          numColumns={isDesktop ? 3 : columnNumber}
          renderItem={({ item, index }) => {
            return (
              <PoolAvatar
                key={`${index}`}
                avatar={item.avatar}
                countryCode={item.countryCode}
                poolNumber={item.poolNumber}
                color={item.color}
              />
            );
          }}
        />
      )}
      {showResultBanner && (
        <Animated.Text
          style={{
            flex: 1,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            color: bannerColor,
            fontFamily: "PoppinsBold",
            fontSize: animateValue,
            lineHeight: bannerFontSize + 5,
          }}
        >
          {players} <br /> {isWinner ? "Winners" : "Losers"} <br />
          {isWinner ? winAmount : "0.00"}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  "mobile-container": {
    flex: 1,
    backgroundColor: blackColor,
    height: "100%",
    // height: 175,
    // maxWidth: 360,
  },
  "tablet-container": {
    flex: 1,
    backgroundColor: blackColor,
    borderColor: "red",
    border: "3px solid",
    borderRadius: 10,
    // height: "100%",
    // maxWidth: 360,
  },
  "desktop-container": {
    flex: 1,
    backgroundColor: blackColor,
    minWidth: 290,
    borderColor: "red",
    border: "3px solid",
    borderRadius: 10,
    height: "100%",
    maxWidth: 360,
  },
  avatarContainer: {
    borderTopWidth: 3,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  "mobile-playersContainer": {
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  "tablet-playersContainer": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  "desktop-playersContainer": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  "mobile-headerText": {
    fontSize: 10,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 8,
  },
  "tablet-headerText": {
    fontSize: 14,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 8,
  },
  "desktop-headerText": {
    fontSize: 20,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 8,
  },
  "mobile-poolText": {
    fontSize: 20,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 12,
  },
  "tablet-poolText": {
    fontSize: 32,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 12,
  },
  "desktop-poolText": {
    fontSize: 60,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 12,
  },
  "mobile-detailContainer": {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "tablet-detailContainer": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "desktop-detailContainer": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "mobile-numberText": {
    fontSize: 20,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 12,
  },
  "tablet-numberText": {
    fontSize: 24,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 12,
  },
  "desktop-numberText": {
    fontSize: 26,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingRight: 12,
  },
  "mobile-detailText": {
    color: "#FFF",
    opacity: 0.5,
    fontSize: 14,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  "tablet-detailText": {
    color: "#FFF",
    opacity: 0.5,
    fontSize: 16,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  "desktop-detailText": {
    color: "#FFF",
    opacity: 0.5,
    fontSize: 16,
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "500",
  },
});
