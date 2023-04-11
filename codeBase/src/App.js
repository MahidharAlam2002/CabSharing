import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Home from './Components/succ_login/home.js';
import MyBooking from './Components/succ_login/myBookings';
import Profile from './Components/succ_login/profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <header>
        
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
          {/* <Route index element={<Login />} /> */}
          <Route exact path="/home" element={<Home/>} />
          
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/mybookings" element={<MyBooking/>} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
      </header>
     
    </div>
  );
}

export default App;
