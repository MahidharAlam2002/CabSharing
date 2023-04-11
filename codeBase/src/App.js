import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Home from './Components/succ_login/home';
import myBooking from './Components/succ_login/myBookings';
import Profile from './Components/succ_login/profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
          {/* <Route index element={<Login />} /> */}
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/mybooking" element={<myBooking/>} />
          <Route exact path="/profile" element={<Profile/>} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
      </header>
     
    </div>
  );
}

export default App;
