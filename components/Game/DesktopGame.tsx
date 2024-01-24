import PoolTreasuryContainer, {
  PoolTreasuryContainerProps,
} from "../../components/PoolTreasuryContainer";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import BidButton from "../../components/BidButton";
import GameNumberBid from "../../components/GameNumberBid";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import GradientBackground from "../../components/GradientBackground";
import Chart from "./Chart";

export type GameProps = {
  greenPool: PoolTreasuryContainerProps;
  redPool: PoolTreasuryContainerProps;
  showResultBanner?: Boolean;
  payoutAmount?: number;
  gameCreatedat?: Date;
  gameId?: String;
  canAcceptBit?: Boolean;
};

export default function DesktopGame({
  greenPool,
  redPool,
  showResultBanner = false,
  payoutAmount,
  gameCreatedat,
  gameId,
  canAcceptBit,
}: GameProps) {
  const { device } = useDeviceSize();

  return (
    <>
      <View style={styles[`${device}-container`]}>
        <View style={styles.fullHeight}>
          <PoolTreasuryContainer
            action={"Up"}
            poolTreasury={greenPool.poolTreasury}
            players={greenPool.avatars.length}
            avatars={greenPool.avatars}
            isWinner={false}
            showResultBanner={showResultBanner}
            winAmount={`${payoutAmount}`}
          />

          <BidButton type="Up" />
        </View>

        <View
          style={[
            styles.fullHeight,
            { display: "flex", flex: 1, marginHorizontal: 10 },
          ]}
        >
          <Chart
            gameCreatedat={gameCreatedat}
            gameId={gameId}
            canAcceptBit={canAcceptBit}
          />
          <GameNumberBid />
        </View>

        <View style={styles.fullHeight}>
          <PoolTreasuryContainer
            action={"Down"}
            poolTreasury={redPool.poolTreasury}
            players={redPool.avatars.length}
            avatars={redPool.avatars}
            isWinner={true}
            showResultBanner={showResultBanner}
            winAmount={`${payoutAmount}`}
          />
          <BidButton type="Down" />
        </View>
      </View>
      <GradientBackground />
    </>
  );
}

const styles = StyleSheet.create({
  "mobile-container": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    padding: 24,
  },
  "tablet-container": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    padding: 24,
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
  fullHeight: {
    height: "100%",
  },
});
