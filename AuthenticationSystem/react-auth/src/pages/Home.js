import React, { useEffect, useState } from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import ExchangeRates from './ExchangeRates';

const Home = () => {
  const location = useLocation();
  const [data,setData] = useState({
    email: null
  });
  useEffect(() => {
    if (location.state) {
      if (location.state.email) {
        setData({
          ...data,
          email: location.state.email,
        });
      }
    }
  }, [location]);
  return <>
    <div className="bg-red-400 h-5">Hello World</div>
    {data.email && <div>{data.email}</div>}
    <ExchangeRates/>
  </>;
};

export default Home;