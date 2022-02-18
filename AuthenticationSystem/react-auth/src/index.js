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
  HttpLink,
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
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  connectToDevTools: true,
  cache: new InMemoryCache(),
  // request: (operation) => {
  //   const token = localStorage.getItem("token");
  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : "",
  //     },
  //   });
  // }
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
  .then((result) => console.log("hello"));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
