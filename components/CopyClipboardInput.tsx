import { TextInput, View } from "react-native";
import { Button } from "./Button";
import CopyClipboard from "../assets/images/icons/copy_clipboard.svg";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-root-toast";

type CopyToClipboardInputProps = {
  text: string;
};

export default function CopyToClipboardInput({
  text,
}: CopyToClipboardInputProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        editable={false}
        value={text}
        style={{
          padding: 10,
          borderWidth: 2,
          borderColor: "#FFB300",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          width: 300,
          height: 50,
          color: "#fff",
        }}
      />
      <Button
        style={{
          backgroundColor: "#FFB300",
          height: 50,
          width: 50,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          Clipboard.setString(text);
          Toast.show("Text copied to clipboard", {
            duration: Toast.durations.SHORT,
          }); // Error with package, solution: https://github.com/magicismight/react-native-root-toast/issues/172
        }}
      >
        <View
          style={{
            backgroundColor: "#FFB300",
            height: 50,
            width: 50,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CopyClipboard />
        </View>
      </Button>
    </View>
  );
}
