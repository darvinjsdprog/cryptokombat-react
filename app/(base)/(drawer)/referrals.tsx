import { StyleSheet, View } from "react-native";
import { PoppinsBoldText, PoppinsText } from "../../../components/StyledText";
import { SEO } from "../../../components/SEO";
import { DrawerDivider } from "../../../components/Drawer/CustomDrawer";
import CopyToClipboardInput from "../../../components/CopyClipboardInput";
import Mail from "../../../assets/images/icons/social-media/mail.svg";
import Facebook from "../../../assets/images/icons/social-media/facebook.svg";
import Messenger from "../../../assets/images/icons/social-media/messenger.svg";
import Twitter from "../../../assets/images/icons/social-media/twitter.svg";
import { Button } from "../../../components/Button";
import KpiCard from "../../../components/KpiCard";
import { CryptoDataGrid } from "../../../components/DataGrid";

export default function ReferralsPage() {
  return (
    <>
      <SEO title={"Referral program"} description={"Referral program"} />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerInnerContainer}>
            <PoppinsBoldText style={styles.title}>
              Referral Program
            </PoppinsBoldText>
            <CopyToClipboardInput
              text={"https://dev.cryptofight.pro/referrals"}
            />
            <PoppinsText style={{ paddingLeft: 12 }}>or use:</PoppinsText>
            <View
              style={{ display: "flex", flexDirection: "row", paddingLeft: 16 }}
            >
              <Button>
                <Mail />
              </Button>
              <Button>
                <Facebook />
              </Button>
              <Button>
                <Messenger />
              </Button>
              <Button>
                <Twitter />
              </Button>
            </View>
          </View>

          <DrawerDivider width={3} />
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              paddingTop: 24,
              justifyContent: "center",
              gap: 50,
            }}
          >
            <KpiCard />
            <KpiCard />
            <KpiCard />
          </View>
        </View>
        <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
          <CryptoDataGrid />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
  },
  headerInnerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    flex: 1,
  },
});
