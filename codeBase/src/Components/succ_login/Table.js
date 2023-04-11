import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TableUI() {
  const [data, setData] = useState([
    { scheduleid: 1, startplace: 'New York', endplace: 'Los Angeles', date: '2023-04-15', time: '12:00 PM', count: 4, status: 'Unjoin' },
    { scheduleid: 2, startplace: 'San Francisco', endplace: 'Seattle', date: '2023-04-16', time: '10:00 AM', count: 2, status: 'Unjoin' },
    { scheduleid: 3, startplace: 'Chicago', endplace: 'Houston', date: '2023-04-17', time: '1:00 PM', count: 6, status: 'Unjoin' },
  ]);

  const handleStatusClick = (index) => {
    const newData = [...data];
    if (newData[index].status === 'Unjoin') {
      newData[index].count -= 1;
      newData[index].status = 'Join';
    } else {
      newData[index].count += 1;
      newData[index].status = 'Unjoin';
    }
    setData(newData);
  };

  return (
    <div className="container">
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Start Place</th>
            <th>End Place</th>
            <th>Date</th>
            <th>Time</th>
            <th>Count</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.scheduleid}>
              <td>{row.scheduleid}</td>
              <td>{row.startplace}</td>
              <td>{row.endplace}</td>
              <td>{row.date}</td>
              <td>{row.time}</td>
              <td>{row.count}</td>
              <td>
                <Button onClick={() => handleStatusClick(index)} variant={row.status === 'Unjoin' ? 'danger' : 'success'}>
                  {row.status}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableUI;