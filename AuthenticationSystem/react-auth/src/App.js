import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import LoginGQL from "./pages/LoginGQL";
import AuthUser from "./pages/AuthUser";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        console.log("res", res);
        if (res.data) {
          console.log(res.data.email);
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setUser(null);
      });
  }, [login]);
  const SignInWrapper = ({ children, currentUser }) => {
    return currentUser ? <Navigate to={"/"} replace /> : children;
  };
  return (
    <>
      <Router>
        <Header user={user} setLogin={()=>setLogin(false)} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setLogin={()=>setLogin(true)} />} />
          <Route path="/user" element={<AuthUser user={user}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginql" element={<LoginGQL />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
