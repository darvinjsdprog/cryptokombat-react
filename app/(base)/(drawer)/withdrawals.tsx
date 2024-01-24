import { View } from "react-native";
import { PoppinsText } from "../../../components/StyledText";
import { SEO } from "../../../components/SEO";
import { CryptoDataGrid } from "../../../components/DataGrid";
import { blackColor } from "../../../constants/Colors";

export default function WithdrawalsPage() {
  return (
    <>
      <SEO title={"My Withdrawals"} description={"My Withdrawals"} />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ padding: 20 }}>
          <PoppinsText
            style={{
              fontSize: 42,
              color: blackColor,
              fontWeight: "700",
              lineHeight: 48,
              paddingVertical: 20,
            }}
          >
            My Withdrawals
          </PoppinsText>
          <CryptoDataGrid />
        </View>
      </View>
    </>
  );
}
