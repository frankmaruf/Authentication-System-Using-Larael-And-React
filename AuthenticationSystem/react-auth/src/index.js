import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
//import tailwindcss
// import '../node_modules/tailwindcss/dist/tailwind.min.css';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   cache: new InMemoryCache()
// });
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        users {
          id
          first_name
          last_name
          email
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
