import { atom } from "recoil";
import { User, UserPreferences } from "../types/user";

export const connectedWalletState = atom<String>({
  key: "connectedWallet",
  default: "",
});

export const webTokenState = atom<String>({
  key: "webToken",
  default: "",
});

export const GLOBAL_USER_STATE = atom<User>({
  key: "GLOBAL_USER_STATE",
  default: undefined,
});

export const GLOBAL_USER_PREFERENCES_STATE = atom<UserPreferences>({
  key: "GLOBAL_USER_PREFERENCES_STATE",
  default: {
    sound: true,
    language: "English",
  } as UserPreferences,
});

export const initialUserPreferences = {
  sound: true,
  language: "English",
} as UserPreferences;

export const GAME_BID_NUMBER_GLOBAL_STATE = atom<number>({
  key: "GAME_BID_NUMBER_GLOBAL_STATE",
  default: 5,
});
