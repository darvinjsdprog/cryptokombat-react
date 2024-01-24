import { Pressable, StyleProp, StyleSheet, TextStyle } from "react-native";

import { View } from "./Themed";
import Facebook from "../assets/images/icons/facebook.svg";
import Twitter from "../assets/images/icons/twitter.svg";
import Instagram from "../assets/images/icons/instagram.svg";
import { A } from "@expo/html-elements";
import { hoveredStyle } from "../constants/Styles";
import { useDeviceSize } from "../hooks/useDeviceSize";
import { Button } from "./Button";

type SocialMediaContainerProps = {
  style?: StyleProp<TextStyle>;
};

export default function SocialMediaContainer({
  style,
}: SocialMediaContainerProps) {
  const { isMobile } = useDeviceSize();
  const iconSize = isMobile ? 20 : 30;
  return (
    <View style={[styles.container, style]}>
      <Button>
        <A target="_blank" style={[styles.pRigth]} href="https://facebook.com">
          <Facebook width={iconSize} height={iconSize} />
        </A>
      </Button>
      <Button>
        <A target="_blank" style={[styles.pRigth]} href="https://twitter.com">
          <Twitter width={iconSize} height={iconSize} />
        </A>
      </Button>
      <Button>
        <A target="_blank" style={[styles.pRigth]} href="https://instagram.com">
          <Instagram width={iconSize} height={iconSize} />
        </A>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // paddingLeft: 16,
  },
  pRigth: {
    paddingRight: 16,
  },
});
