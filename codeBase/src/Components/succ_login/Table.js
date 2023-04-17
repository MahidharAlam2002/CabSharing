import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Dialoguebox.css";

function TableUI(props) {
  const [data, setData] = useState([
    { scheduleid: 1, startplace: 'New York', endplace: 'Los Angeles', date: '2023-04-15', time: '12:00 PM', listOfPassengers:[] ,status: 'Join' },
    { scheduleid: 2, startplace: 'San Francisco', endplace: 'Seattle', date: '2023-04-16', time: '10:00 AM', listOfPassengers:[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}, {SNo:2, Name:"NTR",PhNo: "0000000002"}] , status: 'Join' },
    { scheduleid: 3, startplace: 'Chicago', endplace: 'Houston', date: '2023-04-17', time: '1:00 PM', listOfPassengers:[{SNo:1, Name:"Ram Charan3",PhNo: "0000000001"}, {SNo:2, Name:"NTR",PhNo: "0000000002"}, {SNo:3, Name:"Allu Arjun",PhNo: "0000000003"}] , status: 'Join' },
  ]);

  const profileDetails={name: 'Balayya1', email:'abc@def.com', phonenumber: '1234567890', startplace: 'IIT Hyderabad', endplace: 'Miyapur', date: '2023-04-15', time: '12:00 PM'};

  const handleStatusClick = (index) => {
    document.getElementById(index+"dialogdiv").style.display="block";
  };

  const displayPassengers=(displayTableIndex)=>{
    if(document.getElementById(displayTableIndex).style.display==="none")
    {
      document.getElementById(displayTableIndex).style.display="block";
      document.getElementById(displayTableIndex).dataset.myObject=data[displayTableIndex].listOfPassengers;
    }
    else
      document.getElementById(displayTableIndex).style.display="none";
  };

  const cancelButton=(index)=>{
    document.getElementById(index+"dialogdiv").style.display="none";
  };

  const confirmButton=(status, index)=>{
    const newData=[...data];
    if(status==="Join")
    {
      /*  code to merge the join request */
      data[index].status="Unjoin";
    }
    else
    {
      /*  code to demerge the join request */
      data[index].status="Join";
    }
    setData(newData);
    document.getElementById(index+"dialogdiv").style.display="none";
    
  };

  const showStatus=props.showStatus;
  const showCount=props.showCount;
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
            {showCount &&<th>Count</th>}
            {showStatus && <th>Status</th>}
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
              {showCount && <td>{Object.keys(row.listOfPassengers).length} 
                <Button onClick={()=>displayPassengers(index)}>{"view"}</Button>

                <div className='container' >
                  <Table striped bordered hover id={index} style={{display: "none"}}>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Ph.No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {row.listOfPassengers.map(passenger=>(
                        <tr key={passenger.SNo}>
                          <td>{passenger.SNo}</td>
                          <td>{passenger.Name}</td>
                          <td>{passenger.PhNo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </td>}
              {showStatus && <td>
                <Button onClick={()=>handleStatusClick(index)} variant={row.status === 'Unjoin' ? 'danger' : 'success'}>{row.status}</Button>
                <div style={{display: "none"}} id={index+"dialogdiv"}>
                  <div id="myDialog" class="dialog">
                    <div id="mydialog-content" class="dialog-content" >
                        <div class="dialog-body">
                            <h2>Please Confirm the below details</h2>
                            <p>Name: {profileDetails.name}</p>
                            <p>Email: {profileDetails.email}</p>
                            <p>Phone Number: {profileDetails.phonenumber}</p>
                            <p>Start Place: {profileDetails.startplace}</p>
                            <p>End Place: {profileDetails.endplace}</p>
                            <p>Date: {profileDetails.date}</p>
                            <p>Time: {profileDetails.time}</p>
                        </div>
                        <div class="dialog-footer">
                            <button id="cancelButton" onClick={()=>cancelButton(index)}  class="dialog-button">Cancel</button>
                            <button id="okButton" onClick={()=>confirmButton(row.status, index)} class="dialog-button">Confirm</button>
                        </div>
                    </div>
                  </div>
                </div>
                </td>} 
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableUI;