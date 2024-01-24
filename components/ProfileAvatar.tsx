import { StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { blackColor } from "../constants/Colors";
export type AvatarProps = {
  size?: number | "small" | "medium" | "large" | "xlarge" | undefined;
  url?: String;
};

export default function ProfileAvatar({ size = "xlarge", url }: AvatarProps) {
  return (
    <>
      <Avatar
        rounded
        size={size}
        containerStyle={[styles.circleAvatar, { borderColor: blackColor }]}
        overlayContainerStyle={{ backgroundColor: "#0C0D13" }}
        avatarStyle={!url ? styles.staticImage : {}}
        source={!url ? require("../assets/images/favicon.png") : url}
      />
    </>
  );
}

const styles = StyleSheet.create({
  circleAvatar: {
    borderWidth: 3,
  },
  staticImage: {
    height: "75%",
    objectFit: "contain",
    width: "75%",
    margin: "auto",
  },
});
