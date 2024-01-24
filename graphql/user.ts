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

const USER_SUBSCRIPTION = gql`
  ${USER_FRAGMENT}
  subscription userSub {
    data: userSub {
      ...UserFragment
    }
  }
`;

const USER_CREATE_MUTATION = gql`
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
const CHECK_USER = gql`
  mutation checkUser($phone: String!) {
    checkUser(phone: $phone)
  }
`;
const USER_LOGIN_MUTATION = gql`
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

const USER_LOGIN_WALLET_MUTATION = gql`
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

const USER_DEVICES_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation userDevices($hwid: String!, $token: String!, $id: Int) {
    userDevices(hwid: $hwid, token: $token, id: $id) {
      ...UserFragment
    }
  }
`;

const LAST_VISIT = gql`
  mutation lastVisit($userId: Int) {
    lastVisit(userId: $userId) {
      id
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  ${USER_FRAGMENT}
  query fetchUser($id: Int!) {
    data: fetchUser(id: $id) {
      ...UserFragment
    }
  }
`;

export const UPDATE_AVATAR_MUTATION = gql`
  mutation photoUpload($userId: Int, $file: Upload) {
    data: photoUpload(userId: $userId, file: $file) {
      id
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: Int!
    $lastName: String
    $firstName: String
    $phone: String
    $email: String
    $nickName: String
    $birthDate: DateTime
    $role: Int
    $realBalance: Float
    $demoBalance: Float
    $referralBalance: Float
    $ban: String
    $referralPercent: Float
    $bio: String
  ) {
    data: updateUser(
      id: $id
      lastName: $lastName
      firstName: $firstName
      nickName: $nickName
      email: $email
      phone: $phone
      birthDate: $birthDate
      role: $role
      realBalance: $realBalance
      balance: $demoBalance
      balanceRef: $referralBalance
      ban: $ban
      referralPercent: $referralPercent
      bio: $bio
    ) {
      id
    }
  }
`;

//
export const REFERRALS_FOR_USER_QUERY = gql`
  query referralsForUser {
    referralsForUser {
      id
      phone
      nickName
      firstName
      lastName
      parentId
    }
  }
`;

export const UPDATE_REFERRAL_USER_MUTATION = gql`
  mutation updateReferralUser($parentId: Int!, $userId: Int!) {
    updateReferralUser(parentId: $parentId, userId: $userId) {
      id
      parentId
    }
  }
`;
