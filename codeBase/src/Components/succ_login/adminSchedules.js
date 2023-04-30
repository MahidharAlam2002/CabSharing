import AdminNavbar from './AdminNavbar';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminSchedules() {

  const [data, setData] = useState([]);
    useEffect(() => {
      async function fetchData() { 
        const response = await axios.get('/schedules');
        if (response.data !== "") {
          console.log(response.data);
          console.log(data);
          const parsedData = response.data.map((row) => ({
            id:row.schedule_id,
            start_place: row.start_place,
            end_place: row.end_place,
            date: row.date,
            time: row.time
          }));
          setData(parsedData);
        }
        else
        {
          console.log("schedules data not retrieved yet.")
        }
      }
      fetchData();
    }, []);

<<<<<<< Updated upstream


=======
>>>>>>> Stashed changes
    return ( 
    <div>
      <AdminNavbar/>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Start Place</th>
            <th>End Place</th>
            <th>Date</th>
            <th>Time</th>
            <th>Delete Schedule</th>
          </tr>
        </thead>
        <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.start_place}</td>
            <td>{row.end_place}</td>
            <td>{row.date}</td>
            <td>{row.time}</td>
            <td><Button variant="outline-danger" onClick={ async function (){
                const rowData = {schedule_id:row.id, start_place:row.start_place, end_place: row.end_place, date: row.date, time: row.time};
                  async function sendData() { 
                    const response = await axios.post('/schedules', rowData);
                    if (response.data !== "") {
                      console.log(response.data);
                    }
                    else
                    {
                      console.log("schedule data not sent yet.")
                    }
                  }
                  sendData();
                
            }}>Delete This Schedule</Button></td>
          </tr>
        ))}
        </tbody>
      </Table>

    </div> );
}

export default AdminSchedules;