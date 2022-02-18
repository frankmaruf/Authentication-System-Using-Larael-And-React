import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthUser = ({user}) => {
let message;
if(user){
    message = <div> Welcome {user.first_name} {user.last_name}</div>
}else{
    message = <div> You are not logged in</div>
}
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default AuthUser;
