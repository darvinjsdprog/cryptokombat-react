export interface RateResponse {
  cryptoRatesSub: CryptoRatesSub[];
}

export interface CryptoRatesSub {
  createdAt: string;
  type?: string;
  cryptos: Cryptos;
  __typename: string;
}

export interface Cryptos {
  btc: number;
  eth: number;
  ada: number;
  xrp: number;
  sol: number;
  "book-10": number;
  xag: number;
  xau: number;
  xpt: number;
}
