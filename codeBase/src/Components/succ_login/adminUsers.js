import AdminNavbar from './AdminNavbar';
import SearchAndAddForm from "./Search";
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUsers() {

  const [data, setData] = useState([]);
    useEffect(() => {
      async function fetchData() { 
        const response = await axios.get('/users');
        if (response.data !== "") {
          console.log(response.data);
          console.log(data);
          const parsedData = response.data.map((row) => ({
            google_id: row.google_id,
            name: row.name,
            email: row.email,
            phone: row.phone
          }));
          setData(parsedData);
        }
        else
        {
          console.log("users data not retrieved yet.")
        }
      }
      fetchData();
    }, []);

    return ( 
    <div>
      <AdminNavbar/>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
        {data.map((row) => (
          <tr key={row.email}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.phone}</td>
            <td><Button variant="outline-danger" onClick={ async function (){
                const rowData = {google_id: row.google_id, name:row.name, email:row.email, phone: row.phone};
                  async function sendData() { 
                    const response = await axios.post('/users', rowData);
                    if (response.data !== "") {
                      console.log(response.data);
                    }
                    else
                    {
                      console.log("user data not sent yet.")
                    }
                  }
                  sendData();
                
            }}>Delete This User</Button></td>
          </tr>
        ))}
        </tbody>
      </Table>

    </div> );
}

export default AdminUsers;