import { StyleSheet, View, Modal, Dimensions } from "react-native";
import { blackColor } from "../constants/Colors";
import React from "react";

type PopupProps = {
  visible: boolean;
  children: React.ReactNode;
};

export function PopUpModal({ children, visible }: PopupProps) {
  return (
    <Modal
      visible={visible}
      presentationStyle="overFullScreen"
      transparent={true}
      animationType="fade"
    >
      <View style={{ backgroundColor: blackColor, flex: 1 }}>{children}</View>
    </Modal>
  );
}
