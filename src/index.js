import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

// importing the required dependencies into root js file
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// create http-link which will connect your Apollo Client instance to your GraphQL API (server)
const httpLink = createHttpLink({
  uri: "https://sleepy-lake-68690.herokuapp.com/"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://sleepy-lake-68690.herokuapp.com/`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);
// Instantiate apollo client, pass the http link, and a new instance of inmemorycache
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// Render root component of the react app. Wrap the root component in the apolloprovider and this gets passed the client as a prop.
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
