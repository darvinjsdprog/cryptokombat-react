import { PoolTreasuryContainerProps } from "../../components/PoolTreasuryContainer";
import { SEO } from "../../components/SEO";
import { StyleSheet } from "react-native";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import GradientBackground from "../../components/GradientBackground";
import DesktopGame from "../../components/Game/DesktopGame";
import MobileGame from "../../components/Game/MobileGame";
import { useEffect, useMemo, useState } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { GAME_SUBSCRIPTION } from "../../graphql/game";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { useGameCounter } from "../../hooks/useGameCounter";
import { count } from "d3-array";
import { PoolAvatarProps } from "../../components/PoolAvatar";

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

  // https://i.seadn.io/gae/U5CPeK3FlFboSOAXx26VRzGTmqr2fTFGfXS4iZMxqVIN2n1qAziWZGWceJG-ilNMdFxMKATGZiY2_ltjIUXD9DzKuG3Q55ol0SjpDg?auto=format&dpr=1&w=1000
  // https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1296
  // https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg
  // https://imgv3.fotor.com/images/gallery/watercolor-female-avatar.jpg
  const { countdown } = useGameCounter({
    createdAt: response?.createdAt,
    gameId: response?.id,
    acceptBet: response?.canAcceptBet,
  });

  const [greenValues, setGreen] =
    useState<PoolTreasuryContainerProps>(greenPool);
  const [redValues, setRed] = useState<PoolTreasuryContainerProps>(redPool);
  console.log("countdown", countdown, greenValues);
  useEffect(() => {
    if (response && countdown) {
      if (countdown === 0) {
        setGreen({
          ...greenValues,
          avatars: [],
        });
        setRed({
          ...redValues,
          avatars: [],
        });
      }
      if (countdown > 15 && response?.canAcceptBet) {
        if (greenValues.avatars.length <= 0) {
          const avatar: PoolAvatarProps = {
            avatar:
              "https://i.seadn.io/gae/U5CPeK3FlFboSOAXx26VRzGTmqr2fTFGfXS4iZMxqVIN2n1qAziWZGWceJG-ilNMdFxMKATGZiY2_ltjIUXD9DzKuG3Q55ol0SjpDg?auto=format&dpr=1&w=1000",
            countryCode: "US",
            poolNumber: "5",
            color: "Red",
          };
          setGreen({
            ...greenValues,
            avatars: [...greenValues.avatars, avatar],
          });
        }
        if (greenValues.avatars.length > 0) {
          const avatar: PoolAvatarProps = {
            avatar:
              "https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1296",
            countryCode: "US",
            poolNumber: "10",
            color: "Red",
          };
          const avatar2: PoolAvatarProps = {
            avatar:
              "https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1296",
            countryCode: "UA",
            poolNumber: "10",
            color: "Red",
          };
          setGreen({
            ...greenValues,
            avatars: [...greenValues.avatars, avatar],
          });
          setGreen({
            ...greenValues,
            avatars: [...greenValues.avatars, avatar2],
          });
        }
        if (redValues.avatars.length <= 0) {
          const avatar = {
            avatar:
              "https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg",
            countryCode: "US",
            poolNumber: "5",
            color: "Red",
          };
          setRed({
            ...redValues,
            avatars: [...redValues.avatars, avatar],
          });
        }
        if (redValues.avatars.length > 0) {
          const avatar = {
            avatar:
              "https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg",
            countryCode: "UA",
            poolNumber: "10",
            color: "Red",
          };
          const avatar2 = {
            avatar:
              "https://imgv3.fotor.com/images/gallery/watercolor-female-avatar.jpg",
            countryCode: "UA",
            poolNumber: "10",
            color: "Red",
          };
          setRed({
            ...redValues,
            avatars: [...redValues.avatars, avatar],
          });
          setRed({
            ...redValues,
            avatars: [...redValues.avatars, avatar2],
          });
        }
      }
    }
  }, [countdown]);

  const showResultBanner = false;
  const payoutAmount = response?.result ?? 0;
  const gameId = response?.id;
  return (
    <>
      <SEO title={"Home"} description={"Play to earn crypto"} />
      {isDesktop && (
        <DesktopGame
          greenPool={greenValues}
          redPool={redValues}
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
