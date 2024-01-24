const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
export const greenColor = "#01FF3B";
export const redColor = "#FF010A";
export const blackColor = "#0c0d13e0";
export const gradientColor = [greenColor, "#000", redColor];

export default {
  light: {
    text: "#000",
    background: "transparent",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "transparent",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
