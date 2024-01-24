import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import ConnectWallet from "../../../components/ConnectWallet";
import { useRecoilState } from "recoil";
import { connectedWalletState } from "../../../state/globalStateKeys";
import GradientBackground from "../../../components/GradientBackground";

export default function DrawerLayout() {
  const [walletAddress, _] = useRecoilState(connectedWalletState);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (walletAddress === "") {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [walletAddress]);

  // return <RootLayoutNav />;
  return (
    <>
      {showLoginModal && (
        <ConnectWallet
          visible={showLoginModal}
          setVisible={setShowLoginModal}
          redirectToIndex={true}
        />
      )}
      <Slot />
      <GradientBackground />
    </>
  );
}
