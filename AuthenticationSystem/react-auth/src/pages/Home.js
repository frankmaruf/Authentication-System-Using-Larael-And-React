import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => {
  return <>
    <div className="bg-red-400 h-5">Hello World</div>
    <Navigate to="/login" replace state={{ 'hello':"It's Me" }} />
  </>;
};

export default Home;