import { gql } from "graphql-tag";
export const GAME_BET_FRAGMENT = gql`
  fragment GameBetFragment on Bet {
    id
    gameId
    type
    status
    amount: ammount
    received: predictWin
    gameType
    crypto
    predictWin
    baseBet
    # user {
    #   id
    #   firstName
    #   lastName
    # }
  }
`;

// const GAME_INSTANCE_FRAGMENT = gql`
//   fragment GameInstanceFragment on GameInstance {
//     id
//     teamDownBets {
//       ...GameBetFragment
//     }
//     teamUpBets {
//       ...GameBetFragment
//     }
//     bank
//     startRate
//     lastRate
//     allBets {
//       ...GameBetFragment
//     }
//   }
// `;

const GAME_BET_USER_FRAGMENT = gql`
  fragment GameBetUserFragment on User {
    id
    firstName
    lastName
    nickname: nickName
    avatar: url
  }
`;

export const GAME_FRAGMENT = gql`
  fragment GameFragment on Game {
    id
    canAcceptBet: acceptBets
    createdAt
    startObjectRate
    lastObjectRate
    instances
  }
`;

const ONLINE_USER_FRAGMENT = gql`
  fragment OnlineUserFragment on User {
    id
  }
`;

const GAME_QUERY = gql`
  ${GAME_FRAGMENT}
  query game($crypto: String) {
    data: game(crypto: $crypto) {
      ...GameFragment
    }
  }
`;

const GAME_BET_QUERY = gql`
  ${GAME_BET_FRAGMENT}
  query bet($crypto: String) {
    data: activeBet(crypto: $crypto) {
      ...GameBetFragment
    }
  }
`;

const GAME_TOP_WINNERS_QUERY = gql`
  ${GAME_BET_FRAGMENT}
  ${GAME_BET_USER_FRAGMENT}
  query topWinners {
    data: topWinners {
      ...GameBetFragment
      user {
        ...GameBetUserFragment
      }
    }
  }
`;

const ONLINE_USERS_QUERY = gql`
  ${ONLINE_USER_FRAGMENT}
  query onlineUsers {
    data: onlineUsers {
      ...OnlineUserFragment
    }
  }
`;

export const GAME_SUBSCRIPTION = gql`
  ${GAME_FRAGMENT}
  subscription gameSub($crypto: String) {
    data: gameSub(crypto: $crypto) {
      ...GameFragment
    }
  }
`;

const GAME_BET_SUBSCRIPTION = gql`
  ${GAME_BET_FRAGMENT}
  subscription betSub($crypto: String) {
    data: betSub(crypto: $crypto) {
      ...GameBetFragment
    }
  }
`;

const ONLINE_USERS_SUBSCRIPTION = gql`
  ${ONLINE_USER_FRAGMENT}
  subscription onlineUsersSub {
    data: onlineUsersSub {
      ...OnlineUserFragment
    }
  }
`;

const ONLINE_TOP_WINNERS_SUBSCRIPTION = gql`
  ${GAME_BET_FRAGMENT}
  ${GAME_BET_USER_FRAGMENT}
  subscription topWinnersSub {
    data: topWinnersSub {
      ...GameBetFragment
      user {
        ...GameBetUserFragment
      }
    }
  }
`;

const GAME_BET_MUTATION = gql`
  ${GAME_BET_FRAGMENT}
  mutation createBet(
    $type: Int
    $ammount: Int
    $gameType: Int
    $betCrypto: String
  ) {
    data: createBet(
      type: $type
      ammount: $ammount
      gameType: $gameType
      betCrypto: $betCrypto
    ) {
      ...GameBetFragment
    }
  }
`;
