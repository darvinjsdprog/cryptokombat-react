import { gql } from "graphql-tag";
import { USER_FRAGMENT } from "./auth";

export const REQUEST_FRAGMENT = gql`
  fragment RequestFragment on Request {
    id
    sku
    amount: ammount
    createdAt
    status
    userId
    balanceColumn
    user {
      id
      nickname: nickName
      avatar: url
      firstName
      lastName
      phone
      referal
    }
    creditorId
    creditor {
      id
      nickname: nickName
      avatar: url
      firstName
      lastName
      phone
      referal
    }
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    sku
    title
    description
    status
    images
    parentId
    countriesQuantities
    children {
      id
      title
      description
      children {
        id
        title
        description
        children {
          id
          title
          description
          children {
            id
            title
            description
            children {
              id
              title
              description
              children {
                id
                title
                description
              }
            }
          }
        }
      }
    }
    parents {
      id
      title
      description
    }
    hasChildren
    createdAt
    updatedAt
  }
`;

export const All_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  query allCategories(
    $page: Int
    $pageSize: Int
    $search: String
    $filter: JSON
  ) {
    allCategories(
      page: $page
      pageSize: $pageSize
      search: $search
      filter: $filter
    ) {
      meta {
        page
        pageSize
        total
      }
      list {
        ...CategoryFragment
      }
    }
  }
`;
export const All_CATEGORIES_USER = gql`
  ${CATEGORY_FRAGMENT}
  query allCategoriesUser($parentId: Int) {
    allCategoriesUser(parentId: $parentId) {
      ...CategoryFragment
    }
  }
`;
export const All_CATEGORIES_USER_SEARCH = gql`
  ${CATEGORY_FRAGMENT}
  query allCategoriesUserSearch(
    $parentId: Int
    $search: String
    $lang: String
    $coords: JSON
  ) {
    allCategoriesUserSearch(
      parentId: $parentId
      search: $search
      lang: $lang
      coords: $coords
    ) {
      ...CategoryFragment
    }
  }
`;
export const OPTION_VALUE_FRAGMENT = gql`
  fragment OptionValueFragment on OptionValue {
    id
    sku
    title
    status
    optionId
    option {
      id
      title
      inputType
    }
    createdAt
    updatedAt
  }
`;
export const OPTION_FRAGMENT = gql`
  ${OPTION_VALUE_FRAGMENT}
  fragment OptionFragment on Option {
    id
    sku
    title
    inputType
    status
    values {
      ...OptionValueFragment
    }
    createdAt
    updatedAt
  }
`;
export const All_OPTIONS = gql`
  ${OPTION_FRAGMENT}
  query allOptions($page: Int, $pageSize: Int, $search: String, $filter: JSON) {
    allOptions(
      page: $page
      pageSize: $pageSize
      search: $search
      filter: $filter
    ) {
      meta {
        page
        pageSize
        total
      }
      list {
        ...OptionFragment
      }
    }
  }
`;
//
export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    sku
    title
    description
    status
    images
    categoryId
    popular
    category {
      title
    }
    countriesQuantities
    # parentCategories {
    #   title
    #   description
    # }
    price
    quantity
    optionsValues
    marketplace
    marketplaceEmail
    marketplacePhone
    createdAt
    updatedAt
  }
`;

export const ORDER_PRODUCT_FRAGMENT = gql`
  fragment OrderProductFragment on Product {
    id
    sku
    orderId
    order
    variant
    salePrice
    productId
    product
    createdAt
    updatedAt
  }
`;

export const GET_OPTION_VALUES = gql`
  ${OPTION_VALUE_FRAGMENT}
  query getOptionValues($optionId: Int!) {
    getOptionValues(optionId: $optionId) {
      ...OptionValueFragment
    }
  }
`;

export const DELIVERY_ADDRESS_FRAGMRNT = gql`
  fragment DeliveryAddressFragment on DeliveryAddress {
    id
    sku
    userId
    user {
      id
      nickname: nickName
      avatar: url
      firstName
      lastName
      phone
      referal
    }
    firstName
    lastName
    email
    phone
    country
    city
    street
    streetNumber
    postcode
    createdAt
    updatedAt
  }
`;

export const ORDER_FRAGMENT = gql`
  ${DELIVERY_ADDRESS_FRAGMRNT}
  fragment OrderFragment on Order {
    id
    sku
    title
    description
    status
    trackingNumber
    trackingUrl
    total
    products
    productsData
    carrier
    addressId
    address {
      ...DeliveryAddressFragment
    }
    userId
    user {
      id
      nickname: nickName
      avatar: url
      firstName
      lastName
      phone
      referal
    }
    updatedAt
    createdAt
  }
`;

export const GET_ORDER_PRODUCTS = gql`
  ${ORDER_PRODUCT_FRAGMENT}
  query getOrderProducts($orderId: Int!) {
    getOrderProducts(orderId: $orderId) {
      ...OrderProductFragment
    }
  }
`;
//
export const TRANSACTION_FRAGMENT = gql`
  fragment TransactionFragment on Transaction {
    id
    sku
    type
    amount: ammount
    createdAt
    code
    status
    userId
    file
    custom
    details
    bankAccount
    recipientId
    balanceColumn
    isActivate
    user {
      id
      nickname: nickName
      avatar: url
      firstName
      lastName
      phone
      referal
    }
    recipient {
      id
      nickname: nickName
      avatar: url
      firstName
      lastName
      phone
      referal
    }
  }
`;

export const PROCESS_TRANSACTION_MUTATION = gql`
  ${TRANSACTION_FRAGMENT}
  mutation processTransaction(
    $id: Int!
    $status: Int!
    $ammount: Float
    $custom: String # balanceColumn: String
  ) {
    data: processTransaction(
      id: $id
      status: $status
      ammount: $ammount
      custom: $custom # balanceColumn: $balanceColumn
    ) {
      ...TransactionFragment
    }
  }
`;

/**
 * RANKS FLOW
 */

export const RANK_FRAGMENT = gql`
  fragment RankFragment on Rank {
    id
    title
    sku
    selfBonus
    refBonus
    rangeFrom
    rangeTo
    isActive
    createdAt
    updatedAt
  }
`;

export const ALL_RANKS = gql`
  ${RANK_FRAGMENT}
  query {
    allRanks {
      ...RankFragment
    }
  }
`;

export const CREATE_RANK = gql`
  ${RANK_FRAGMENT}
  mutation createRank(
    $title: String!
    $selfBonus: Int!
    $refBonus: Int!
    $rangeFrom: Int!
    $rangeTo: Int!
    $isActive: Boolean
  ) {
    createRank(
      title: $title
      selfBonus: $selfBonus
      refBonus: $refBonus
      rangeFrom: $rangeFrom
      rangeTo: $rangeTo
      isActive: $isActive
    ) {
      ...RankFragment
    }
  }
`;

export const UPDATE_RANK = gql`
  ${RANK_FRAGMENT}
  mutation updateRank(
    $id: Int!
    $title: String!
    $selfBonus: Int!
    $refBonus: Int!
    $rangeFrom: Int!
    $rangeTo: Int!
    $isActive: Boolean
  ) {
    updateRank(
      id: $id
      title: $title
      selfBonus: $selfBonus
      refBonus: $refBonus
      rangeFrom: $rangeFrom
      rangeTo: $rangeTo
      isActive: $isActive
    ) {
      ...RankFragment
    }
  }
`;

export const DELETE_RANK = gql`
  ${RANK_FRAGMENT}
  mutation deleteRank($id: Int!) {
    deleteRank(id: $id) {
      ...RankFragment
    }
  }
`;

/**
 * CHANGE RIGHTS
 */

export const UPDATE_RIGHTS = gql`
  ${USER_FRAGMENT}
  mutation updateRights($userId: Int!, $rights: JSON!) {
    updateRights(userId: $userId, rights: $rights) {
      ...UserFragment
    }
  }
`;

export const GET_ADDITIONAL = gql`
  query getAdditional($title: String!) {
    getAdditional(title: $title) {
      id
      title
      sku
      info
      json
      createdAt
      updatedAt
    }
  }
`;

export const SET_ADDITIONAL = gql`
  mutation setAdditional($title: String!, $info: String!, $json: JSON) {
    setAdditional(title: $title, info: $info, json: $json) {
      id
      title
      sku
      info
      json
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRANSFER_MUTATION = gql`
  mutation transferFundsBetweenAccountsNew(
    $recipientPhone: String!
    $amount: Float!
    $balanceColumn: String
    $notes: String
  ) {
    transferFundsBetweenAccountsNew(
      recipientPhone: $recipientPhone
      amount: $amount
      balanceColumn: $balanceColumn
      notes: $notes
    ) {
      id
      sku
      userId
      type
      ammount
      code
      status
      createdAt
      updatedAt
      details
      file
      notes
      user {
        id
        email
        phone
        role
        nickName
        realBalance
        balance
      }
    }
  }
`;
export const PROCESS_REQUEST_MUTATION = gql`
  ${REQUEST_FRAGMENT}
  mutation processRequest($id: Int!, $status: Int!) {
    data: processRequest(id: $id, status: $status) {
      ...RequestFragment
    }
  }
`;
export const PRODUCTS_QUERY = gql`
  ${PRODUCT_FRAGMENT}
  query allProductsAdmin(
    $page: Int
    $pageSize: Int
    $search: String
    $filter: JSON
    $lang: String
  ) {
    data: allProductsAdmin(
      page: $page
      pageSize: $pageSize
      search: $search
      filter: $filter
      lang: $lang
    ) {
      meta {
        page
        pageSize
        total
      }
      list {
        ...ProductFragment
      }
    }
  }
`;
export const PRODUCTS_QUERY_USER = gql`
  ${PRODUCT_FRAGMENT}
  query allProductsUser(
    $page: Int
    $pageSize: Int
    $search: String
    $filter: JSON
    $coords: JSON
  ) {
    data: allProductsUser(
      page: $page
      pageSize: $pageSize
      search: $search
      filter: $filter
      coords: $coords
    ) {
      meta {
        page
        pageSize
        total
      }
      list {
        ...ProductFragment
      }
    }
  }
`;
export const PRODUCTS_BY_CATEGORY = gql`
  ${PRODUCT_FRAGMENT}
  query productsByCategory(
    $categoryId: Int
    $page: Int
    $pageSize: Int
    $search: String
    $filter: JSON
    $coords: JSON
  ) {
    productsByCategory(
      categoryId: $categoryId
      page: $page
      pageSize: $pageSize
      search: $search
      filter: $filter
      coords: $coords
    ) {
      meta {
        page
        pageSize
        total
      }
      list {
        ...ProductFragment
      }
    }
  }
`;
export const SUPPORT_MESSAGE_FRAGMENT = gql`
  fragment SupportMessageFragment on SupportMessage {
    id
    sku
    userId
    user {
      id
      nickName
      firstName
      lastName
      avatar: url
      newSupportMessagesForAdmin
      lastSupportMessageForAdmin
    }
    translation
    message
    image
    sender
    status
    createdAt
    updatedAt
  }
`;
