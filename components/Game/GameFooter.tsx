import { StyleSheet, View } from "react-native";
import VSSvg from "../../assets/images/icons/vs.svg";
import Favicon from "../../assets/images/icons/favicon.svg";
import { PoppinsBoldText, PoppinsText } from "../StyledText";
import { greenColor, redColor } from "../../constants/Colors";
import { useDeviceSize } from "../../hooks/useDeviceSize";

type GameFooterProps = {
  width: number;
};

export default function GameFooter({ width }: GameFooterProps) {
  return (
    <View style={styles.container}>
      <FooterItem
        title={"YOUR INVESTMENT"}
        value={"0"}
        isGreen={true}
        width={width}
      />
      <FooterItem
        title={"POTENTIAL RETURN"}
        value={"0"}
        isGreen={true}
        width={width}
      />
      <FooterItem
        title={"UP POOL PAYOUT"}
        value={"0%"}
        withIcon={false}
        isGreen={true}
        width={width}
      />
      <VSSvg style={{ flex: 1 }} height={"90%"} />
      <FooterItem
        title={"UP POOL PAYOT"}
        value={"0%"}
        withIcon={false}
        isGreen={false}
        width={width}
      />
      <FooterItem
        title={"POTENTIAL RETURN"}
        value={"0"}
        isGreen={false}
        width={width}
      />
      <FooterItem
        title={"YOUR INVESTMENT"}
        value={"0"}
        isGreen={false}
        width={width}
      />
    </View>
  );
}

type FooterItemProps = {
  title: String;
  value: String;
  withIcon?: boolean;
  isGreen: boolean;
  width: number;
};

function FooterItem({
  title,
  value,
  withIcon = true,
  isGreen,
  width,
}: FooterItemProps) {
  const { isDesktop, isTablet } = useDeviceSize();
  const size = isDesktop ? 30 : 24;
  const fontSize = width > 363 && width < 760 ? 20 : size;
  return (
    <View style={styles.item}>
      <PoppinsText style={styles.innerText}>{title}</PoppinsText>
      <View style={styles.itemInner}>
        <PoppinsBoldText
          style={[
            styles.innerNumber,
            { fontSize: fontSize },
            { color: isGreen ? greenColor : redColor },
          ]}
        >
          {value}
        </PoppinsBoldText>
        {withIcon && <Favicon width={24} height={24} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#0C0D13",
    height: "15%",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
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
    // fontSize: 45,
    fontWeight: "600",
  },
});
