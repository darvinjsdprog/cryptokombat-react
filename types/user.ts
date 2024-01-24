export interface UserObject {
  user: User;
  token: string;
  __typename: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: any;
  phone: string;
  email: any;
  nickname: any;
  demoBalance: number;
  realBalance: number;
  realBalanceLastIncome: any;
  demoBalanceLastIncome: any;
  referralBalance: any;
  referralBalanceLastIncome: any;
  referral: string;
  role: number;
  birthDate: any;
  avatar: any;
  ban: any;
  deviceInfo: any;
  rights: any;
  devices: any;
  pushes: any;
  newRequests: number;
  referralPercent: any;
  bio: any;
  countContacts: number;
  __typename: string;
}

export interface UserPreferences {
  sound: boolean;
  language: string;
}
