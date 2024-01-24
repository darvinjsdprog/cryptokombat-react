import { StyleSheet, View } from "react-native";
import { blackColor } from "../constants/Colors";
import Bonus from "../assets/images/icons/bonus.svg";
import Favicon from "../assets/images/icons/favicon.svg";
import { PoppinsBoldText, PoppinsText } from "./StyledText";
import { Divider } from "react-native-elements";

export default function KpiCard() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View
          style={{ backgroundColor: "#413A59", padding: 10, borderRadius: 10 }}
        >
          <Bonus />
        </View>

        <View style={styles.headerInner}>
          <PoppinsText style={styles.headerTitle}>Bonus</PoppinsText>
          <View style={styles.headerRow}>
            <Favicon width={30} height={30} />
            <PoppinsText style={styles.headerText}>10,300,432</PoppinsText>
          </View>
        </View>
      </View>
      <View style={styles.detail}>
        <View style={styles.detailInner}>
          <PoppinsText>Last Bonus</PoppinsText>
          <IconText text={"2342.00"} />
        </View>
        <Divider color="#413A59" />
        <View style={styles.detailInner}>
          <PoppinsText>Paid</PoppinsText>
          <IconText text={"2342.00"} />
        </View>
        <Divider color="#413A59" />
      </View>
    </View>
  );
}

type IconTextProps = {
  text: String;
};
function IconText({ text }: IconTextProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 8,
        alignItems: "center",
      }}
    >
      <Favicon width={20} height={20} />
      <PoppinsBoldText
        style={{ fontSize: 20, fontWeight: "600", paddingLeft: 8 }}
      >
        {text}
      </PoppinsBoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
  },
  header: {
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerInner: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    paddingLeft: 8,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: blackColor,
  },
  detail: {
    backgroundColor: blackColor,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  detailInner: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 18,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
