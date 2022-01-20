import React, { useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await axios.post('login', {
        email,
        password
    });

    setRedirect(true);
    // setLogin();
}
  if (redirect) {
    return <Navigate replace to="/"/>;
}
  return <>
       <form className="form-signin" onSubmit={submit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

            <input type="email" className="form-control" placeholder="Email" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <div className="mb-3">
                <Link to="/forgot">Forgot Password?</Link>
            </div>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
  </>;
};

export default Login;
