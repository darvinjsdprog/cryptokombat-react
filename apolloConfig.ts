import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
const { createUploadLink } = require("apollo-upload-client");

export function configureApollo(jwt: String | null) {
  const host = process.env.EXPO_PUBLIC_API_URL ?? "";
  const isProduction = host.includes("https");
  const appDomain = process.env.EXPO_PUBLIC_APP_DOMAIN;
  const token = jwt && jwt !== "" ? `Bearer ${jwt}` : "";
  // using the ability to split links, you can send data to each link
  // @ts-ignore
  const wsLink: ApolloLink = new WebSocketLink({
    uri: `${host
      .replace(/^http?:\/\//, "ws://")
      .replace(/^https?:\/\//, "wss://")}/subscriptions?domain=${appDomain}`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: token,
      },
    },
  });

  const httpLink: ApolloLink = createUploadLink({
    uri: `${host}/graphql?domain=${appDomain}`,
    headers: {
      "Apollo-Require-Preflight": "true",
      authorization: token,
    },
  });

  // depending on what kind of operation is being sent
  const link: ApolloLink = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client: ApolloClient<any> = new ApolloClient({
    //@ts-ignore
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.error(`[Network error]: ${networkError}`);
      }),
      link,
    ]),
    cache: new InMemoryCache(),
  });

  return client;
}
