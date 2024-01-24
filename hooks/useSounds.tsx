import { Audio } from "expo-av";
import { useRecoilState } from "recoil";
import { GLOBAL_USER_PREFERENCES_STATE } from "../state/globalStateKeys";

export type useSoundsHook = {
  playSound(
    name:
      | "click"
      | "errorNotification"
      | "notification"
      | "sendMessage"
      | "winnings"
      | "losing"
      | "timer"
      | "switchAccount"
      | "transaction"
      | "receivingAMessage"
      | "default"
  ): void;
};

export function useSounds() {
  const [userPreferences, _] = useRecoilState(GLOBAL_USER_PREFERENCES_STATE);

  const isSoundEnabled = userPreferences?.sound ?? true;
  async function playSound(
    soundName:
      | "click"
      | "errorNotification"
      | "notification"
      | "sendMessage"
      | "winnings"
      | "losing"
      | "timer"
      | "switchAccount"
      | "transaction"
      | "receivingAMessage"
      | "default"
  ) {
    if (isSoundEnabled) {
      switch (soundName) {
        case "default":
          break;
        case "click":
          const clickObject = await Audio.Sound.createAsync(
            require("../assets/sounds/button.mp3")
          );
          await clickObject.sound.playAsync();
          //   clickObject.sound.unloadAsync();
          //TODO: Case of memory leak, will need to  handle sounds unload
          break;
        case "errorNotification":
          break;
        case "notification":
          break;
        case "sendMessage":
          break;
        case "winnings":
          break;
        case "losing":
          const losingObject = await Audio.Sound.createAsync(
            require("../assets/sounds/lose.mp3")
          );
          await losingObject.sound.playAsync();
          //   setTimeout(() => {

          //   }, 100);
          //   losingObject.sound.unloadAsync();
          break;
        case "timer":
          break;
        case "switchAccount":
          break;
        case "transaction":
          break;
        case "receivingAMessage":
        default:
          break;
      }
    }
  }

  return { playSound } as useSoundsHook;
}
