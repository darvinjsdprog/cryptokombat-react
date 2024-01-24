import { StyleSheet, View } from "react-native";
import VSSvg from "../../assets/images/icons/vs.svg";
import Favicon from "../../assets/images/icons/favicon.svg";
import { PoppinsBoldText, PoppinsText } from "../StyledText";
import { greenColor, redColor } from "../../constants/Colors";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import VerticalDivider from "../VerticalDivider";
import CircleTimer from "./CircleTimer";

type GameHeaderProps = {
  width?: number;
  gameId?: String;
  gameCreatedat?: Date;
  canAcceptBit?: Boolean;
};

export default function GameHeader({
  width = 100,
  gameId,
  gameCreatedat,
  canAcceptBit,
}: GameHeaderProps) {
  const { isDesktop, isTablet } = useDeviceSize();

  return (
    <LinearGradient
      colors={["#000", "#2c2c2c"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.pairContainer}>
        <HeaderItem
          title={"24H WIN RATIO"}
          value={"0%"}
          isGreen={true}
          fontSize={width}
        />
        {isDesktop && (
          <>
            <VerticalDivider style={{ marginHorizontal: 20 }} />
            <HeaderItem
              title={"24H HIGH"}
              value={"0$"}
              isGreen={true}
              fontSize={width}
            />
          </>
        )}
      </View>

      <CircleTimer
        gameCreatedat={gameCreatedat}
        gameId={gameId}
        canAcceptBit={canAcceptBit}
      />
      <View style={styles.pairContainer}>
        <HeaderItem
          title={"24H LIVE PLAYERS"}
          value={"0$"}
          isGreen={true}
          fontSize={width}
        />
        {isDesktop && (
          <>
            <VerticalDivider style={{ marginHorizontal: 20 }} />
            <HeaderItem
              title={"24H LOW"}
              value={"0$"}
              isGreen={false}
              fontSize={width}
            />
          </>
        )}
      </View>
    </LinearGradient>
  );
}

type FooterItemProps = {
  title: String;
  value: String;
  withIcon?: boolean;
  isGreen: boolean;
  fontSize: number;
};

function HeaderItem({
  title,
  value,
  withIcon = true,
  isGreen,
  fontSize,
}: FooterItemProps) {
  const { isDesktop, isTablet } = useDeviceSize();
  const size = fontSize > 363 && fontSize < 760 ? 18 : isDesktop ? 30 : 24;
  return (
    <View style={styles.item}>
      <PoppinsText style={styles.innerText}>{title}</PoppinsText>
      <View style={styles.itemInner}>
        <PoppinsBoldText
          style={[
            styles.innerNumber,
            { fontSize: size },
            { color: isGreen ? greenColor : redColor },
          ]}
        >
          {value}
        </PoppinsBoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  pairContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  itemInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  innerText: {
    textTransform: "uppercase",
    fontSize: 8,
  },
  innerNumber: {
    fontWeight: "600",
  },
});
