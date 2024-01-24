import React from "react";
import { Pressable, PressableProps, View } from "react-native";
import { useSounds } from "../hooks/useSounds";

type ButtonProps = {
  children?: React.ReactNode;
} & PressableProps;

export function Button(props: ButtonProps) {
  const { playSound } = useSounds();
  return (
    <Pressable
      {...props}
      disabled={props.disabled}
      style={props.disabled ? { opacity: 0.8 } : {}}
      onPress={(event) => {
        playSound("click");
        if (props.onPress) {
          props.onPress(event);
        }
      }}
    >
      {({ pressed, hovered }) => (
        <View style={[{ opacity: hovered || pressed ? 0.8 : 1 }]}>
          {props.children}
        </View>
      )}
    </Pressable>
  );
}
