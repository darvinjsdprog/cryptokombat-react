// import { useSDK } from "@metamask/sdk-react";
import { useState, useEffect, useCallback } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { router } from "expo-router";

import { useRecoilState } from "recoil";
import {
  GLOBAL_USER_STATE,
  connectedWalletState,
  initialUserPreferences,
  webTokenState,
} from "../state/globalStateKeys";
import { useStorage } from "./useStorage";
import {
  USER_KEY,
  USER_PREFERENCES_KEY,
  walletAddressKey,
  webToken,
} from "../state/storageKeys";
import { useMutation } from "@apollo/react-hooks";
import { USER_LOGIN_WALLET_MUTATION } from "../graphql/auth";

type useWalletResult = {
  provider?: ethers.providers.Web3Provider;
  connectMetamask(): Promise<void>;
  connectedWallet?: String;
  disconnectWallet(): void;
  windowEth?: any;
};

export function useWallet() {
  // const infuraEndpoint = `${process.env.EXPO_PUBLIC_INFURA_ENDPOINT}/${process.env.EXPO_PUBLIC_INFURA_API_KEY}`;
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null); // For Metamask
  const [walletConnector, setWalletConnector] = useState(null); // For WalletConnect
  const [ethProvider, setEthProvider] = useState<any>(null);
  const [connectedWallet, setConnectedWallet] =
    useRecoilState(connectedWalletState);
  const [_, setWebToken] = useRecoilState(webTokenState);
  const [userGlobalState, setUserGlobalState] =
    useRecoilState(GLOBAL_USER_STATE);
  const { storeData, storeObject, getData } = useStorage();

  const [loginWallet, { loading }] = useMutation(USER_LOGIN_WALLET_MUTATION, {
    onError: (error) => {
      console.error(error);
    },
    onCompleted: (data) => {
      if (data) {
        const token = data.data.token;
        storeData(webToken, token);
        storeObject(USER_KEY, data.data);
        setUserGlobalState(data.data);
        setWebToken(token);
        router.replace("/game");
      }
    },
  });

  useEffect(() => {
    const anyWindow = window as any;
    setEthProvider(anyWindow);

    if (anyWindow.ethereum) {
      anyWindow.ethereum.on("accountsChanged", async () => {
        const accounts = await provider?.listAccounts();
        if (!accounts || accounts?.length === 0) disconnectWallet();
      });
    }

    // Detect Metamask provider
    async function detectProvider() {
      const detectedProvider = await detectEthereumProvider();
      if (detectedProvider) {
        const provi = new ethers.providers.Web3Provider(detectedProvider);
        setProvider(provi);
      }
    }
    detectProvider();

    // Initialize WalletConnect
    //   const connector = new WalletConnectProvider({
    //     // WalletConnect options
    //   });
    //   setWalletConnector(connector);
  }, [connectedWallet]);

  useEffect(() => {
    const setStorage = async () => {
      await storeData(walletAddressKey, connectedWallet as string);
    };

    const fetchStorage = async () => {
      const storedAddress = await getData(walletAddressKey);
      if (storedAddress && storedAddress !== "") {
        setConnectedWallet(storedAddress);
      }
      if (connectedWallet !== "" && connectedWallet !== storedAddress) {
        setStorage();
      }
    };

    fetchStorage();
  }, [connectedWallet]);

  const connectMetamask = useCallback(async () => {
    if (provider && ethProvider) {
      await ethProvider.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await provider.listAccounts();
      const address = accounts[0];
      await loginWallet({
        variables: { walletAddress: address, deviceInfo: undefined },
      });
      setConnectedWallet(address);
      await storeObject(USER_PREFERENCES_KEY, initialUserPreferences as any);

      //TODO: Sign the wallet to call smartContracts
    } else {
      console.log("Metamask is not installed");
      // Metamask not found
      // Prompt user to install Metamask
    }
  }, [connectedWallet, ethProvider, provider]);

  const connectWalletConnect = async () => {
    if (walletConnector) {
      try {
        // await walletConnector.enable();
        // Handle WalletConnect connection
        // Listen for events from walletConnector
      } catch (error) {
        // Handle connection error
      }
    } else {
      // WalletConnect not initialized
      // Prompt user to check their setup
    }
  };

  const disconnectWallet = useCallback(async () => {
    await storeData(walletAddressKey, "");
    await storeData(webToken, "");
    setConnectedWallet("");
    setWebToken("");
    router.replace("/");
  }, [connectedWallet, ethProvider, provider]);

  const result = {
    provider,
    connectMetamask,
    connectedWallet,
    disconnectWallet,
    windowEth: ethProvider,
  } as useWalletResult;

  return result;
}
