import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const LoginGQL = () => {
  //   const LOGIN = gql`
  //   mutation login($email: String!, $password: String!) {
  //     login(email: $email, password: $password) {
  //       token
  //       user {
  //         id
  //         first_name
  //         last_name
  //         email
  //       }
  //     }
  //   }
  // `;
    const LOGIN = gql`
    mutation {
      userLogin(
        email:"thefrankmaruf@gmail.com"
        password: "1234"
      ) {
        email
      }
    }
  `;
    const loginUser = useMutation(LOGIN);
    // const { loading, error, data } = useMutation(LOGIN);
    console.log(loginUser);
 return (
            <div>
                <h1>User</h1>
                <ul>
                    {/* {data.login.user.map(user => (
                        <li key={user.id}>
                            <li>{user.first_name}</li>
                            <li>{user.last_name}</li>
                            <li>{user.email}</li>
                        </li>
                    ))} */}
                </ul>
            </div>
        )
};
export default LoginGQL;
