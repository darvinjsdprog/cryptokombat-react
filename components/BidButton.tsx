import DownArrow from "../assets/images/icons/down_arrow.svg";
import ArrowButtonContainer from "./ArrowButtonContainer";
import { greenColor, redColor } from "../constants/Colors";
import { Button } from "./Button";
import { useWallet } from "../hooks/useWallet";
import { useState } from "react";
import ConnectWallet from "./ConnectWallet";
import UpArrow from "../assets/images/icons/up_arrow.svg";

type BidButtonProps = {
  type?: "Up" | "Down";
};

export default function BidButton({ type }: BidButtonProps) {
  const { connectedWallet } = useWallet();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const action = () => {
    if (!connectedWallet || connectedWallet === "") {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      {showLoginModal && (
        <ConnectWallet
          visible={showLoginModal}
          setVisible={setShowLoginModal}
        />
      )}
      <Button onPress={() => action()}>
        <ArrowButtonContainer
          style={[
            type === "Down"
              ? { borderColor: redColor }
              : { borderColor: greenColor },
          ]}
        >
          {type == "Down" ? <DownArrow height={"100%"} /> : <UpArrow />}
        </ArrowButtonContainer>
      </Button>
    </>
  );
}
