import { StyleSheet, Switch } from "react-native";
import { View } from "react-native";
import { PoppinsText } from "../StyledText";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerDivider } from "./CustomDrawer";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Href, router } from "expo-router";
import { Router } from "expo-router";
import { Button } from "../Button";
type DrawerItemProps = {
  url?: Href<"pathname"> | null;
  placeholder: String;
  icon: React.ReactNode;
  showTrailing?: boolean;
  isToggable?: boolean;
  toggleValue?: boolean;
  // setIsToggle?(value: boolean): void;
  onChangeToggle?(value: boolean): void;
  isPicker?: boolean;
  onPress?(): Promise<void>;
};

export default function DrawerItem({
  url,
  placeholder,
  icon,
  showTrailing = true,
  isToggable = false,
  isPicker = false,
  onChangeToggle,
  toggleValue,
  onPress,
}: DrawerItemProps) {
  const { isDesktop, isTablet } = useDeviceSize();
  const size = isDesktop ? 20 : isTablet ? 18 : 16;
  // const [isToggle, setIstoggle] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Button
      onPress={() => (onPress ? onPress() : url ? router.push(url) : null)}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            {icon}
            <PoppinsText style={[styles.text, { fontSize: size }]}>
              {placeholder}
            </PoppinsText>
          </View>
          {showTrailing && (
            <FontAwesome name="chevron-right" color={"white"} size={size} />
          )}
          {isToggable && onChangeToggle && toggleValue !== undefined && (
            <Switch
              trackColor={{ false: "#767577", true: "#56AB2F" }}
              thumbColor={"#fff"}
              ios_backgroundColor="#fff"
              onValueChange={() => onChangeToggle(!toggleValue)}
              value={toggleValue}
            />
          )}
          {isPicker && (
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Spanish" value="sp" />
            </Picker>
          )}
        </View>
        <DrawerDivider />
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: "space-between",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    color: "#FFFFFF",
    paddingLeft: 6,
  },
});
