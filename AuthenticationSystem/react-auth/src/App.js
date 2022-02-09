import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import LoginGQL from './pages/LoginGQL';
function App() {
  return (
<>
<Router>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path='/loginql' element={<LoginGQL />} />
  </Routes>
</Router>
</>
  );
}

export default App;
