import { StyleSheet, View } from "react-native";
import { PoppinsBoldText, PoppinsText } from "../StyledText";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { GameMode, useGameCounter } from "../../hooks/useGameCounter";
import { useEffect } from "react";

// import * as Progress from "expo-progress";
type CircleTimerProps = {
  gameCreatedat?: Date;
  gameId?: String;
  canAcceptBit?: Boolean;
};

export default function CircleTimer({
  gameCreatedat,
  gameId,
  canAcceptBit,
}: CircleTimerProps) {
  const { isDesktop, isTablet, isMobile } = useDeviceSize();

  const containerSize = isDesktop ? 150 : 100;
  const { description, reset, mode, countdown } = useGameCounter({
    createdAt: gameCreatedat,
    gameId: gameId,
    acceptBet: canAcceptBit,
  });
  const fontBase = isDesktop ? 45 : 34;
  const font = mode === GameMode.PLAYING ? fontBase : fontBase / 2;

  return (
    <View style={[styles.circleContainer, { height: "96%" }]}>
      <View
        style={[
          styles.innerContainer,
          { width: containerSize, borderRadius: containerSize / 2 },
        ]}
      >
        {/* <Progress.Bar isIndeterminate color="blue" /> */}
        <PoppinsBoldText style={[styles.number, { fontSize: font }]}>
          {description}
        </PoppinsBoldText>
        {mode === GameMode.PLAYING && (
          <PoppinsText style={[styles.time, { fontSize: font / 2 }]}>
            SEC
          </PoppinsText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flex: 1,
    width: "100%",
    // height: 150,
    position: "absolute",
    top: 5,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#0D2219",
    // width: 150,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  number: {
    // fontSize: 45,
    textAlign: "center",
    fontWeight: "800",
  },
  time: {
    // fontSize: 20,
    fontWeight: "500",
    opacity: 0.8,
  },
});
