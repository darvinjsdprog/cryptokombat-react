import { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { PopUpModal } from "./Popup";
import { PoppinsBoldText, PoppinsText } from "./StyledText";
import Metamask from "../assets/images/icons/metamask.svg";
import WalletConnect from "../assets/images/icons/walletConnect.svg";
import Coinbase from "../assets/images/icons/coinbase.svg";
import LiveSupport from "../assets/images/icons/support.svg";
import { Button } from "./Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider } from "react-native-elements";
import { router } from "expo-router";
import { useWallet } from "../hooks/useWallet";
import { useRecoilState } from "recoil";
import { connectedWalletState } from "../state/globalStateKeys";

type ConnectWalletProps = {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  redirectToIndex?: boolean;
};

export default function ConnectWallet({
  visible,
  setVisible,
  redirectToIndex = false,
}: ConnectWalletProps) {
  const { connectMetamask, connectedWallet, windowEth } = useWallet();
  const [walletAddress, _] = useRecoilState(connectedWalletState);
  const isMetamask = !!windowEth && !!windowEth.ethereum; //TODO: Disable button if not

  return (
    <>
      <PopUpModal visible={visible ?? false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <PoppinsBoldText style={styles.title}>
              Connect Wallet
            </PoppinsBoldText>

            <Button
              onPress={() => {
                if (redirectToIndex) {
                  setVisible(false);
                  router.replace("/");
                }
                setVisible(false);
              }}
              style={styles.circleButton}
            >
              <FontAwesome name="close" size={25} color={"white"} />
            </Button>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.detail}>
              <Items
                setVisible={setVisible}
                connectMetamask={connectMetamask}
                connectedWallet={walletAddress}
              />
            </View>
            <View>
              <Divider color="#413A59" />
              <PoppinsText
                style={{
                  color: "#FFFFFF80",
                  textAlign: "center",
                  paddingBottom: 18,
                }}
              >
                For other options:
              </PoppinsText>
              <Button>
                <View style={styles.item}>
                  <PoppinsText style={[styles.text, { color: "#FFB300" }]}>
                    Live support
                  </PoppinsText>
                  <LiveSupport
                    width={40}
                    height={40}
                    style={{ paddingRight: 8 }}
                  />
                </View>
              </Button>
            </View>
          </View>
        </View>
      </PopUpModal>
    </>
  );
}

type ItemsProps = {
  connectMetamask(): Promise<void>;
  connectedWallet?: String | null;
} & ConnectWalletProps;

function Items({ setVisible, connectMetamask, connectedWallet }: ItemsProps) {
  return (
    <View style={styles.detail}>
      <Button
        onPress={async () => {
          await connectMetamask();
          setVisible(false);
          if (connectedWallet) {
            router.replace("/game");
          }
        }}
      >
        <View style={styles.item}>
          <PoppinsText style={styles.text}>Metamask</PoppinsText>
          <Metamask width={40} height={40} style={{ paddingRight: 8 }} />
        </View>
      </Button>
      <Button>
        <View style={styles.item}>
          <PoppinsText style={styles.text}>Wallet Connect</PoppinsText>
          <WalletConnect width={60} height={60} />
        </View>
      </Button>
      <Button>
        <View style={styles.item}>
          <PoppinsText style={styles.text}>Coinbase Wallet</PoppinsText>
          <Coinbase width={40} height={40} style={{ paddingRight: 8 }} />
        </View>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171524",
    width: "90%",
    maxWidth: 500,
    maxHeight: 500,
    borderRadius: 18,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    padding: 14,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    alignItems: "center",
  },
  detailContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  circleButton: {
    borderRadius: 200,
    border: "1px solid #413A59",
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#413A59",
    borderRadius: 18,
    padding: 14,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
