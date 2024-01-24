import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "../Button";
import { PoppinsBoldText, PoppinsText } from "../StyledText";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "react-native-elements/dist/helpers";

// import { Button } from './Button'
// import { IStep, Labels } from '../types'
export type Shape =
  | "circle"
  | "rectangle"
  | "circle_and_keep"
  | "rectangle_and_keep";
export interface BorderRadiusObject {
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
}

export interface IStep {
  name: string;
  order: number;
  visible?: boolean;
  target: any;
  text: string;
  wrapper: any;
  shape?: Shape;
  maskOffset?: number;
  borderRadius?: number;
  keepTooltipPosition?: boolean;
  tooltipBottomOffset?: number;
  borderRadiusObject?: BorderRadiusObject;
}

export interface Labels {
  skip?: string;
  previous?: string;
  next?: string;
  finish?: string;
}
export interface TooltipProps {
  isFirstStep?: boolean;
  isLastStep?: boolean;
  currentStep: IStep;
  labels?: Labels;
  handleNext?: () => void;
  handlePrev?: () => void;
  handleStop?: () => void;
}

export const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}: TooltipProps) => (
  <View
    style={{
      display: "flex",
      padding: 16,
      width: "100%",
    }}
  >
    <View style={styles.tooltipContainer}>
      <PoppinsBoldText style={{ color: "#FF8008", fontSize: 26 }}>
        {currentStep && currentStep.text}
      </PoppinsBoldText>

      <PoppinsText style={styles.detail}>
        {currentStep && details[currentStep.order - 1]}
      </PoppinsText>
    </View>
    <View style={[styles.bottomBar]}>
      {!isLastStep ? (
        <Button style={styles.buttonSkip} onPress={handleStop}>
          <PoppinsText style={[styles.buttonText, { color: "#FF7B00" }]}>
            {labels?.skip || "Skip"}
          </PoppinsText>
        </Button>
      ) : null}
      {/* {!isFirstStep ? (
        <TouchableOpacity onPress={handlePrev}>
          <Button>{labels?.previous || "Previous"}</Button>
        </TouchableOpacity>
      ) : null} */}
      {!isLastStep ? (
        <Button onPress={handleNext}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#FF9029", "#FF7B00"]}
            style={styles.buttonNext}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <PoppinsText style={styles.buttonText}>
              {(labels?.next || "Next") + " →"}
            </PoppinsText>
          </LinearGradient>
        </Button>
      ) : (
        <Button style={{ marginLeft: "auto" }} onPress={handleStop}>
          <LinearGradient
            colors={["#FF9029", "#FF7B00"]}
            style={styles.buttonClose}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <PoppinsText style={styles.buttonText}>
              {labels?.finish || "Close"}
            </PoppinsText>
          </LinearGradient>
        </Button>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  tooltipContainer: {
    flex: 1,
    width: "100%",
    paddingBottom: 14,
  },
  title: {
    color: "#FF8008",
    fontSize: 26,
  },
  detail: {
    color: "#ECECEC",
    fontSize: 18,
    fontWeight: "300",
  },
  buttonNext: {
    padding: 12,
    borderRadius: 10,
  },
  buttonSkip: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#0C0D13",
    border: "2px solid #FF7B00",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0C0D13",
  },
  buttonClose: {
    padding: 12,
    borderRadius: 10,
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const details = [
  `
    1. Simple Access.
    2. No Registration.
    3. Protects Privacy, Enhances Security.
    `,
  `Polygon (MATIC) is a Faster Blockchain That Makes Transactions C and Applications Run Smoothly. You Must Have Polygon Matic Token to Play The Game.`,
  `
    1. Peer to Peer Game.
    2. Trustless Transactions, No Intermediaries.
    3. Audited Smart Contract by Certik 100% Security.
    `,
  `1. No Deposits Needed.
2. Complete Control Over your Crypto.
3. 100% Proof Security.
`,
  `
    1. Winnings Goes Automatically to Your Wallet in the end of the round.
    2. The smart contract pay the winners instantly directly to same wallet you sign the contract with.
    3. Winners pay earning fees {10%}.
    `,
];
