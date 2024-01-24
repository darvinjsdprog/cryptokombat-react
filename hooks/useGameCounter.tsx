import { useEffect, useMemo, useState } from "react";

type useGameCounterProps = {
  createdAt?: Date;
  gameId?: String;
  acceptBet?: Boolean;
};

type GameCounterHook = {
  countdown: number;
  reset: () => void;
  mode: GameMode;
  description: String;
};

export enum GameMode {
  PLAYING,
  WAITING,
  DISTIRBUTING,
}

export function useGameCounter({
  createdAt,
  gameId,
  acceptBet,
}: useGameCounterProps) {
  const initialSeconds = Number.parseInt(
    process.env.EXPO_PUBLIC_GAME_DURATION ?? "20"
  );
  const initialWaiting = 5;
  const initialDistributing = 10;

  const [countdown, setCountdown] = useState<number>(initialSeconds);
  const [distributinTime, setdistributinTime] =
    useState<number>(initialDistributing);
  const [waitingTime, setWaitingTime] = useState<number>(initialWaiting);
  const [mode, setMode] = useState<GameMode>(GameMode.PLAYING);
  const [description, setDescription] = useState<String>("");

  // console.log("accept", acceptBet);
  // console.log("accept", createdAt);
  const GAME_DURATION = Number.parseInt(
    process.env.EXPO_PUBLIC_GAME_DURATION ?? "25000"
    // "25"
  );
  const GAME_BETS_ACCEPTING_PERIOD = 10000;
  //10 seconds waiiting for players
  // when timer is 15 no more plays accepted

  //
  const now = new Date().toISOString(); //UTC Date.Now
  // const now = Date.now();
  const starting = new Date(createdAt ?? now).getTime();
  const timing =
    GAME_DURATION - (new Date(now).getTime() - starting) - (gameId ? 4700 : 0);
  const left = timing > 0 ? timing : 0;
  const progress = (100 / GAME_DURATION) * left;
  const canAcceptBet = left >= GAME_BETS_ACCEPTING_PERIOD && acceptBet;
  // console.log("PROGRESS:", new Date(progress).getSeconds());
  // console.log("PROGRESS-timing:", new Date(timing).getSeconds());

  const gameProgress = useMemo(() => {
    // const date1 = new Date(createdAt ?? now).getTime();
    // const date2 = new Date(now).getTime();

    // const diff = Math.floor((date1 - date2) / 1000);
    // return Math.max(0, diff - 25);
    return Math.abs(
      new Date(now).getSeconds() - new Date(createdAt ?? now).getSeconds() - 30
    );
  }, [createdAt, now, acceptBet]);

  // console.log("gameProgress", gameProgress);

  // console.log("VALUES: ", {
  //   createdAt,
  //   now: new Date(createdAt ?? now),
  //   starting,
  //   starting2: new Date(createdAt!),
  //   gameId,
  //   canAcceptBet,
  //   progress,
  //   timing,
  //   left,
  // });

  /*
  Should be:
  1. 30 sec to start the game (Mining time)
  2. 15 min game duration (no mining)
  3. 7 sec to start the counter again



  */

  useEffect(() => {
    const inProgress = gameProgress > 0;
    const isWaiting = gameProgress <= 10;
    setCountdown(gameProgress);
    setDescription(`${gameProgress.toString()}`);
  }, [gameProgress]);

  const reset = () => {
    setCountdown(gameProgress);
    setWaitingTime(initialWaiting);
    setdistributinTime(initialDistributing);
    setMode(GameMode.PLAYING);
  };

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;
  //   if (countdown > 0 && mode == GameMode.PLAYING) {
  //     intervalId = setInterval(() => {
  //       setCountdown((prevCountdown) => prevCountdown - 1);
  //       setMode(GameMode.PLAYING);
  //       setDescription(countdown.toString());

  //       if (countdown === 1) {
  //         setMode(GameMode.DISTIRBUTING);
  //       }
  //     }, 1000);
  //   } else if (distributinTime > 0 && mode == GameMode.DISTIRBUTING) {
  //     intervalId = setInterval(() => {
  //       setdistributinTime((prevCountdown) => prevCountdown - 1);
  //       setMode(GameMode.DISTIRBUTING);
  //       setDescription("Distributing Payouts");

  //       if (distributinTime === 1) {
  //         setMode(GameMode.DISTIRBUTING);
  //       }
  //     }, 1000);
  //   } else if (waitingTime > 0 && mode == GameMode.WAITING) {
  //     intervalId = setInterval(() => {
  //       setWaitingTime((prevCountdown) => prevCountdown - 1);
  //       setMode(GameMode.WAITING);
  //       setDescription("Waiting...");
  //     }, 1000);
  //   } else if (waitingTime === 0 && GameMode.WAITING) {
  //     reset();
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [countdown, initialSeconds]);

  return { countdown, reset, mode, description };
}
