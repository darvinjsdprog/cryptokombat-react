import { LinearGradient } from "expo-linear-gradient";
import { blackColor, greenColor, redColor } from "../../constants/Colors";
import { StyleSheet, View } from "react-native";
import GameHeader from "./GameHeader";
import GameFooter from "./GameFooter";
import { useSubscription } from "@apollo/react-hooks";
import { Image } from "expo-image";
import VxGraph from "./VxGraph";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { CRYPRO_RATES_SUB } from "../../graphql/rate";
import { RateResponse } from "../../types/rate";

type ChartProps = {
  gameCreatedat?: Date;
  gameId?: String;
  canAcceptBit?: Boolean;
};

export default function Chart({
  gameCreatedat,
  gameId,
  canAcceptBit,
}: ChartProps) {
  const { isMobile, isDesktop } = useDeviceSize();
  const containerRef = useRef<any>();
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);

  const { data: rateResponse } =
    useSubscription<RateResponse>(CRYPRO_RATES_SUB);

  // console.log("rateResponse", rateResponse);
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
        setHeight(containerRef.current.clientHeight);
      }
    };

    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
      setHeight(containerRef.current.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LinearGradient
      colors={[greenColor, redColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.mainContainer, !isDesktop ? { height: "100%" } : {}]}
    >
      <View style={styles.container}>
        <GameHeader
          width={width}
          gameCreatedat={gameCreatedat}
          gameId={gameId}
          canAcceptBit={canAcceptBit}
        />

        <View ref={containerRef} style={{ flex: 1 }}>
          <View style={styles.baseCoin}>
            <Image
              style={{
                width: width - 200,
                height: width - 200,
                margin: "auto",
              }}
              source={require("../../assets/images/landing/btc-base-coin.png")}
              contentFit="contain"
              transition={1000}
            />
          </View>
          <VxGraph width={width} height={height} rateResponse={rateResponse} />
        </View>
        {!isMobile && <GameFooter width={width} />}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 2,
    width: "100%",
    borderRadius: 10,
    padding: 3,
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: blackColor,
    borderRadius: 10,
  },
  baseCoin: {
    position: "absolute",
    zIndex: 0,
    margin: "auto",
    width: "100%",
    height: "100%",
    opacity: 1,
    top: 100,
  },
});
