import { gql, useQuery } from '@apollo/client';
import React from 'react';

const ExchangeRates = () => {
    const Users = gql`
    query {
        users {
          id
          first_name
          last_name
          email
        }
      }
`;
    const { loading, error, data } = useQuery(Users);
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error Occur </p>
    else {
        return (
            <div>
                <h1>Users</h1>
                <ul>
                    {data.users.map(user => (
                        <li key={user.id}>
                            <li>{user.first_name}</li>
                            <li>{user.last_name}</li>
                            <li>{user.email}</li>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
};

export default ExchangeRates;
