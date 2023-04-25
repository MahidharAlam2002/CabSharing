import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Home from './Components/succ_login/home.js';
import MyBooking from './Components/succ_login/myBookings';
import Profile from './Components/succ_login/profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import AdminUsers from './Components/succ_login/adminUsers';
import AdminSchedules from './Components/succ_login/adminSchedules';
import Places from './Components/succ_login/Places';
import AdminRoute from './AdminRoute';

function App() {
  return (
    <div>
      <header>
        
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>

        {/* <Route exact path="/users" element={<AdminUsers />}/>
        <Route exact path="/schedules" element={<AdminSchedules />}/>
        <Route exact path="/places" element={<Places />}/> */}


          {/* <Route index element={<Login />} /> */}
          {/* <Route exact path="/home" element={<Home/>} />
          
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/mybookings" element={<MyBooking/>} /> */}
        {/* </Route> */}

        <Route exact path='/home' element={<PrivateRoute/>}>
          <Route exact path='/home' element={<Home/>}/>
        </Route>
        
        <Route exact path='/mybookings' element={<PrivateRoute/>}>
          <Route exact path='/mybookings' element={<MyBooking/>}/>
        </Route>

        <Route exact path='/profile' element={<PrivateRoute/>}>
          <Route exact path='/profile' element={<Profile/>}/>
        </Route>

        <Route exact path='/users' element={<AdminRoute/>}>
          <Route exact path='/users' element={<AdminUsers/>}/>
        </Route>

        <Route exact path='/schedules' element={<AdminRoute/>}>
          <Route exact path='/schedules' element={<AdminSchedules/>}/>
        </Route>

        <Route exact path='/places' element={<AdminRoute/>}>
          <Route exact path='/places' element={<Places/>}/>
        </Route>

        <Route exact path='/admin/profile' element={<AdminRoute/>}>
          <Route exact path='/admin/profile' element={<Profile/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
        
      </header>
     
    </div>
  );
}

export default App;
