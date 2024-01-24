import AsyncStorage from "@react-native-async-storage/async-storage";

type useStorageResult = {
  storeData(key: string, value: string): Promise<void>;
  storeObject(key: string, value: string): Promise<void>;
  getData(key: string): Promise<string | null>;
  getObjectData(key: string): Promise<any>;
};

export function useStorage() {
  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const storeObject = async (key: string, value: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
      //   if (value !== null) {
      //     // value previously stored
      //   }
    } catch (e) {
      return null;
      // error reading value
    }
  };

  const getObjectData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
      // error reading value
    }
  };

  return {
    storeData,
    storeObject,
    getData,
    getObjectData,
  } as useStorageResult;
}
