import { StyleProp, View, ViewStyle } from "react-native";

type VerticalDividerProps = {
  style?: StyleProp<ViewStyle>;
};

export default function VerticalDivider({ style }: VerticalDividerProps) {
  return (
    <View
      style={[
        {
          height: "80%",
          width: 1,
          backgroundColor: "#FFFFFF",
          opacity: 0.8,
        },
        style,
      ]}
    ></View>
  );
}
