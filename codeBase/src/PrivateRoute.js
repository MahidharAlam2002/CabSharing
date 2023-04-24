import React, { useEffect, useState } from 'react';
import { Navigate, Outlet , useNavigate} from 'react-router-dom';
import axios from 'axios'
import './loading.css'
const PrivateRoute = () => {
    const [auth, Setauth] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      async function fetchData() { 
        const response = await axios.get('/api/authenticate');
        if (response.data !== "") {
          Setauth(true);
          console.log(auth);
        }
        else
        {
            navigate("/" , {replace: true})
        }
      }
      fetchData();
    }, []);
    console.log("auth is",auth)
    if(!auth)
    {
       return <div class="main">
       {/* <div class="load sidebar"></div> */}
     
       <div class="inner">
       {/* <div class="items"> */}
           <div class="load fixtop">
           
           </div>
        
         {/* </div> */}
         <div class="header">
           {/* <div class="load avatar"></div> */}
           <div class="info">
             {/* <div class="load title"></div> */}
             <div class="load text"></div>
           </div>
         </div>
     
         <div class="items">
           <div class="load item2">
           
           </div>
           <div class="load item2"></div>
           <div class="load item2"></div>
         </div>
       </div>
     </div>
     
    }
        // var auth =false; // determine if authorized, from context or however you're doing it
        // if(sessionStorage.getItem('sometoken')){
        //     auth =true;
        // }
        // If authorized, return an outlet that will render child elements
        // If not, return element that will navigate to login page
        return  <Outlet /> ; 
};

export default PrivateRoute;