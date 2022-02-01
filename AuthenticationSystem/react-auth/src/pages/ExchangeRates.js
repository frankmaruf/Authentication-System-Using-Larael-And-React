import { gql, useQuery } from '@apollo/client';
import React from 'react';

const ExchangeRates = () => {
    const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error Occur </p>
    else {
        return (
            <div>
                <h1>Exchange Rates</h1>
                <ul>
                    {data.rates.map(rate => (
                        <li key={rate.currency}>
                            {rate.currency} - {rate.rate}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
};

export default ExchangeRates;
