import { gql } from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    phone
    email
    nickname: nickName
    demoBalance: balance
    realBalance: realBalance
    realBalanceLastIncome: lastWinBet
    demoBalanceLastIncome: lastWinBetDemo
    referralBalance: balanceRef
    referralBalanceLastIncome: lastRefBonus
    referral: referal
    role
    birthDate
    avatar: url
    ban
    deviceInfo
    rights
    devices
    pushes
    newRequests
    referralPercent
    bio
    countContacts
  }
`;

export const USER_QUERY = gql`
  ${USER_FRAGMENT}
  query me {
    data: me {
      ...UserFragment
    }
  }
`;

export const USER_SUBSCRIPTION = gql`
  ${USER_FRAGMENT}
  subscription userSub {
    data: userSub {
      ...UserFragment
    }
  }
`;

export const USER_CREATE_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation createUser(
    $phone: String!
    $nickName: String
    $password: String!
    $referral: String
    $code: String
  ) {
    data: createUser(
      phone: $phone
      nickName: $nickName
      password: $password
      referal: $referral
      code: $code
    ) {
      user {
        ...UserFragment
      }
      token
    }
  }
`;
export const CHECK_USER = gql`
  mutation checkUser($phone: String!) {
    checkUser(phone: $phone)
  }
`;
export const USER_LOGIN_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation login($phone: String!, $password: String!, $deviceInfo: JSON) {
    data: login(phone: $phone, password: $password, deviceInfo: $deviceInfo) {
      user {
        ...UserFragment
      }
      token
    }
  }
`;

export const USER_LOGIN_WALLET_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation loginWallet($walletAddress: String!, $deviceInfo: JSON) {
    data: loginWallet(walletAddress: $walletAddress, deviceInfo: $deviceInfo) {
      user {
        ...UserFragment
      }
      token
    }
  }
`;

export const USER_DEVICES_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation userDevices($hwid: String!, $token: String!, $id: Int) {
    userDevices(hwid: $hwid, token: $token, id: $id) {
      ...UserFragment
    }
  }
`;

export const LAST_VISIT = gql`
  mutation lastVisit($userId: Int) {
    lastVisit(userId: $userId) {
      id
    }
  }
`;
