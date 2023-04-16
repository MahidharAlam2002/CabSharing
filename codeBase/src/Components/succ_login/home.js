import NavBar from "./NavBar";
import SearchAndAddForm from "./Search";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

function Home() {

//     const [user, userData] = useState([]);

//    useEffect(() => {
//       fetch('http://localhost:8080/userData')
//          .then((res) => res.json())
//          .then((data) => {
//             userData(data);
//             console.log(user);
//          })
//          .catch((err) => {
//             console.log(err.message);
//          });
//    }, []);



    return ( <div>
        <NavBar/><SearchAndAddForm/>







        <Button variant="outline-primary" type="submit" href='http://localhost:8080/user'>
        console log my details
      </Button>
        </div> );
}

export default Home;