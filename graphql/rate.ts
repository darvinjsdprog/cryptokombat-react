import { gql } from "graphql-tag";

const RATES_FRAGMENT = gql`
  fragment RatesFragment on CryptoRate {
    createdAt
    type
    cryptos
  }
`;

export const CRYPRO_RATES_SUB = gql`
  ${RATES_FRAGMENT}
  subscription cryptoRatesSub {
    cryptoRatesSub {
      ...RatesFragment
    }
  }
`;

export const CURRENT_RATES_SUB = gql`
  subscription currentRatesSub {
    currentRatesSub
  }
`;

export const CURRENT_RATES = gql`
  query getCurrentRates {
    getCurrentRates
  }
`;
