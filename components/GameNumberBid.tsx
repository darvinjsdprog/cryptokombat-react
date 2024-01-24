import { View } from "./Themed";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { blackColor, greenColor } from "../constants/Colors";
import { PoppinsText } from "./StyledText";
import { useDeviceSize } from "../hooks/useDeviceSize";
import { hoveredStyle } from "../constants/Styles";
import { useState } from "react";
import { useSounds } from "../hooks/useSounds";
import { useRecoilState } from "recoil";
import { GAME_BID_NUMBER_GLOBAL_STATE } from "../state/globalStateKeys";

type GameNumberBidProps = {
  style?: StyleProp<ViewStyle>;
};

export default function GameNumberBid({ style }: GameNumberBidProps) {
  const { device } = useDeviceSize();
  const numbers = process.env.EXPO_PUBLIC_AMOUNTS?.split(",");
  const { playSound } = useSounds();
  const [selectedNumber, setSelectedNumber] = useRecoilState(
    GAME_BID_NUMBER_GLOBAL_STATE
  );

  return (
    <View style={[styles.container, style]}>
      {numbers?.map((number, index) => {
        const n = Number.parseInt(number);
        return (
          <Pressable
            key={number}
            style={[styles.button, n === selectedNumber ? styles.selected : {}]}
            onPress={() => {
              playSound("click");
              setSelectedNumber(n);
            }}
          >
            {({ pressed, hovered }) => {
              return (
                <PoppinsText
                  style={[
                    styles[`${device}-text`],
                    hovered ? { ...hoveredStyle } : {},
                    n === selectedNumber ? styles.selected : {},
                  ]}
                >
                  {n}
                </PoppinsText>
              );
            }}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    // flex: 1,
    paddingTop: 8,
    gap: 8,
  },
  button: {
    backgroundColor: blackColor,
    border: "2px solid " + greenColor,
    borderRadius: 10,
    width: "auto",
    flex: 1,
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    color: "white",
    backgroundColor: greenColor,
  },
  "mobile-text": {
    fontSize: 20,
    color: greenColor,
    fontWeight: "700",
  },
  "tablet-text": {
    fontSize: 28,
    color: greenColor,
    fontWeight: "700",
  },
  "desktop-text": {
    fontSize: 48,
    color: greenColor,
    fontWeight: "700",
  },
});
