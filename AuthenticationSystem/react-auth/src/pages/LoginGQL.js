import React from 'react';
import { gql, useQuery } from '@apollo/client';

const LoginGQL = () => {
    const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          first_name
          last_name
          email
        }
      }
    }
  `;
    const { loading, error, data } = useQuery(LOGIN);
    console.log(data);
 return (
            <div>
                <h1>User</h1>
                <ul>
                    {data.login.user.map(user => (
                        <li key={user.id}>
                            <li>{user.first_name}</li>
                            <li>{user.last_name}</li>
                            <li>{user.email}</li>
                        </li>
                    ))}
                </ul>
            </div>
        )
};
export default LoginGQL;
