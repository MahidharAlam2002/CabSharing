import AdminNavbar from './AdminNavbar';
import { Table, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Places() {

  const [data, setData] = useState([]);
    useEffect(() => {
      async function fetchData() { 
        const response = await axios.get('/places');
        if (response.data !== "") {
          console.log(response.data);
          console.log(data);
          const parsedData = response.data.map((row) => ({
            places:row.place_name
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
            <th>Currently Allowed Places</th>
            <th>Remove Places</th>
          </tr>
        </thead>
        <tbody>
        {data.map((row) => (
          <tr key={row.places}>
            <td>{row.places}</td>
            <td><Button variant="outline-danger" onClick={ async function (){
                const rowData = {places:row.places};
                  async function sendData() { 
                    const response = await axios.post('/places', rowData);
                    if (response.data !== "") {
                      console.log(response.data);
                    }
                    else
                    {
                      console.log("schedule data not sent yet.")
                    }
                  }
                  sendData();
                
            }}>Remove This Place</Button></td>
          </tr>
        ))}
        </tbody>
      </Table>

      
      <Form method='POST' action='/newPlace'>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Add a new Place" name='newPlace' autoComplete='off' />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Add This Place To The Allowed List
      </Button>
    </Form>

    </div> );
}

export default Places;