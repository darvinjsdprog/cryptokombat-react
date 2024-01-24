import { LinearGradient } from "expo-linear-gradient";
import PoolTreasuryContainer, {
  PoolTreasuryContainerProps,
} from "../../components/PoolTreasuryContainer";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import BidButton from "../../components/BidButton";
import GameNumberBid from "../../components/GameNumberBid";
import { blackColor, greenColor, redColor } from "../../constants/Colors";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import GradientBackground from "../../components/GradientBackground";
import GameFooter from "./GameFooter";
import GameHeader from "./GameHeader";
import Chart from "./Chart";
import { GameProps } from "./DesktopGame";

export default function MobileGame({
  greenPool,
  redPool,
  showResultBanner,
  payoutAmount,
  gameCreatedat,
  gameId,
  canAcceptBit,
}: GameProps) {
  const { device, isTablet } = useDeviceSize();
  return (
    <>
      <View style={[styles[`${device}-container`]]}>
        <View
          style={[
            styles.fullHeight,
            {
              display: "flex",
              flex: 1,
            },
          ]}
        >
          {/* <LinearGradient
            colors={isTablet ? [greenColor, redColor] : [blackColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              height: "88%",
              width: "100%",
              borderRadius: 10,
              padding: 3,
              flex: 2,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: blackColor,
                borderRadius: 10,
              }}
            >
              <GameHeader />
              
              {isTablet && <GameFooter />}
            </View>
          </LinearGradient> */}
          {/* <View
            style={{
              flex: 2,
              height: "100%",
              width: "100%",
              borderRadius: 10,
              padding: 3,
            }}
          >
            <Chart />
          </View> */}
          <Chart
            gameCreatedat={gameCreatedat}
            gameId={gameId}
            canAcceptBit={canAcceptBit}
          />
        </View>

        <View
          style={[
            {
              // flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              height: "40%",
              gap: 12,
            },
            !isTablet ? styles.blackBackground : {},
          ]}
        >
          <View style={styles.flex}>
            <PoolTreasuryContainer
              action={"Up"}
              poolTreasury={greenPool.poolTreasury}
              players={greenPool.players}
              avatars={greenPool.avatars}
              showResultBanner={showResultBanner}
              winAmount={`${payoutAmount}`}
            />

            <BidButton type="Up" />
          </View>
          <View style={styles.flex}>
            <PoolTreasuryContainer
              action={"Down"}
              poolTreasury={redPool.poolTreasury}
              players={redPool.players}
              avatars={redPool.avatars}
              showResultBanner={showResultBanner}
              winAmount={`${payoutAmount}`}
            />
            <BidButton type="Down" />
          </View>
        </View>
        <GameNumberBid
          style={[
            { paddingBottom: 12 },
            !isTablet ? styles.blackBackground : {},
          ]}
        />
      </View>
      <GradientBackground />
    </>
  );
}

const styles = StyleSheet.create({
  "mobile-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    // padding: 24,
    width: "100%",
    // paddingBottom: 12,
  },
  "tablet-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    // padding: 24,
    // paddingBottom: 8,
    paddingHorizontal: 24,
    width: "100%",
  },
  "desktop-container": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    padding: 24,
  },
  blackBackground: {
    backgroundColor: "#0C0D13",
  },
  fullHeight: {
    height: "100%",
    width: "100%",
  },
  flex: {
    flex: 1,
  },
});
