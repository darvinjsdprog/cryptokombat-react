import { PoolTreasuryContainerProps } from "../../components/PoolTreasuryContainer";
import { SEO } from "../../components/SEO";
import { StyleSheet } from "react-native";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import GradientBackground from "../../components/GradientBackground";
import DesktopGame from "../../components/Game/DesktopGame";
import MobileGame from "../../components/Game/MobileGame";
import { useMemo } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { GAME_SUBSCRIPTION } from "../../graphql/game";

export default function GamePage() {
  const { isDesktop } = useDeviceSize();
  const { data, loading } = useSubscription(GAME_SUBSCRIPTION, {
    variables: { crypto: "btc" },
  });
  const response = data?.data;
  // console.log("response", response);
  // console.log("response", response);
  const btcInstance = useMemo(() => {
    return response?.instances?.btc[0];
  }, [response]);

  const greenPool = useMemo(() => {
    const team = btcInstance?.teamA as [];
    if (team) {
      return {
        action: "Up",
        poolTreasury: "0", //Determine this amount (is a sum ?)
        players: team.length,
        avatars: team.map((item: any) => {
          return {
            avatar: item?.avatar,

            countryCode: item?.countrCode,
            poolNumber: item?.bid,
            color: "Green",
          };
        }),
      } as PoolTreasuryContainerProps;
    } else {
      return {
        action: "Up",
        poolTreasury: "0",
        players: 0,
        avatars: [],
      } as PoolTreasuryContainerProps;
    }
  }, [btcInstance]);

  const redPool = useMemo(() => {
    const team = btcInstance?.teamB as [];
    if (team) {
      return {
        action: "Down",
        poolTreasury: "0", //Determine this amount (is a sum ?)
        players: team.length,
        avatars: team.map((item: any) => {
          return {
            avatar: item?.avatar,
            countryCode: item?.countrCode,
            poolNumber: item?.bid,
            color: "Red",
          };
        }),
      } as PoolTreasuryContainerProps;
    } else {
      return {
        action: "Down",
        poolTreasury: "0",
        players: 0,
        avatars: [],
      } as PoolTreasuryContainerProps;
    }
  }, [btcInstance]);

  const showResultBanner = false;
  const payoutAmount = response?.result ?? 0;
  const gameId = response?.id;

  return (
    <>
      <SEO title={"Home"} description={"Play to earn crypto"} />
      {isDesktop && (
        <DesktopGame
          greenPool={greenPool}
          redPool={redPool}
          showResultBanner={showResultBanner}
          payoutAmount={payoutAmount}
          gameCreatedat={response?.createdAt}
          gameId={gameId}
          canAcceptBit={response?.canAcceptBet}
        />
      )}
      {!isDesktop && (
        <MobileGame
          greenPool={greenPool}
          redPool={redPool}
          showResultBanner={showResultBanner}
          payoutAmount={payoutAmount}
          gameCreatedat={response?.createdAt}
          gameId={gameId}
          canAcceptBit={response?.canAcceptBet}
        />
      )}
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
