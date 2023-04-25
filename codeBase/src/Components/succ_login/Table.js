import React, { useState,useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Dialoguebox.css";
import axios from 'axios';
import moment from 'moment-timezone';
import TableTest from './Tabletest';
import Loading from './Loading';
function TableUI(props) {
  const [data, setData] = useState([
    // { scheduleid: 1, startplace: 'New York', endplace: 'Los Angeles', date: '2023-04-15', time: '12:00 PM', listOfPassengers:[] ,status: 'Join' },
    // { scheduleid: 2, startplace: 'San Francisco', endplace: 'Seattle', date: '2023-04-16', time: '10:00 AM', listOfPassengers:[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}, {SNo:2, Name:"NTR",PhNo: "0000000002"}] , status: 'Join' },
    // { scheduleid: 3, startplace: 'Chicago', endplace: 'Houston', date: '2023-04-17', time: '1:00 PM', listOfPassengers:[{SNo:1, Name:"Ram Charan3",PhNo: "0000000001"}, {SNo:2, Name:"NTR",PhNo: "0000000002"}, {SNo:3, Name:"Allu Arjun",PhNo: "0000000003"}] , status: 'Join' },
  ]);
  const [LoadTable,setLoadTable]=useState(true);
  const profileDetails={name: 'Balayya1', email:'abc@def.com', phonenumber: '1234567890', startplace: 'IIT Hyderabad', endplace: 'Miyapur', date: '2023-04-15', time: '12:00 PM'};
  const [rerender,setrerender]=useState(false);
  const handleStatusClick = (index) => {
    document.getElementById(index+"dialogdiv").style.display="block";
  };
  const presentlist=[[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}],[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}],[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}],[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}],[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}],[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}]];
  const displayPassengers=(displayTableIndex)=>{
    if(document.getElementById(displayTableIndex).style.display==="none")
    {
      document.getElementById(displayTableIndex).style.display="block";
      document.getElementById(displayTableIndex).dataset.myObject=[{SNo:1, Name:"Ram Charan2",PhNo: "0000000001"}];
    }
    else
      document.getElementById(displayTableIndex).style.display="none";
  };

  const cancelButton=(index)=>{
    document.getElementById(index+"dialogdiv").style.display="none";
  };

  const confirmButton=async(status, index)=>{
    const newData=[...data];
    setLoadTable(true);
    if(status==="Join")
    {
      /*  code to merge the join request */
      const res=await axios.get('/join',{params:{
        schedule_id:newData[index].schedule_id
      }})
      setrerender(true);
      props.handleSearch();
      data[index].status="Unjoin";
    }
    else
    {
      const res=await axios.get('/unjoin',{params:{
        schedule_id:newData[index].schedule_id
      }})
      /*  code to demerge the join request */
      props.handleSearch();
      setrerender(true);
      data[index].status="Join";
    }
    setData(newData);
    setLoadTable(false);
    document.getElementById(index+"dialogdiv").style.display="none";
    
  };
  useEffect(()=>{
    console.log("data came here",props.data);
   
    
    if(props.data)
     { 
      
      setData(props.data)
      setLoadTable(false);
    }
      
  },[props.data,rerender])
  const showStatus=props.showStatus;
  const showCount=props.showCount;
  return (
    <div className="container">
      
      <Table>
        {/* <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Start Place</th>
            <th>End Place</th>
            <th>Date</th>
            <th>Time</th>
            {showCount &&<th>Count</th>}
            {showStatus && <th>Status</th>}
          </tr>
        </thead> */}
        <tbody>
          {LoadTable? <div><Loading/></div>:data.map((row, index) => (
            
            
            
            <tr key={row.schedule_id}>
              <TableTest row={row} handleStatusClick={handleStatusClick} index={index} showCount={showCount} showStatus={showStatus}/>
              {/* <td>{row.schedule_id}</td>
              <td>{row.start_place}</td>
              <td>{row.end_place}</td>
              <td>{moment.utc(row.date).tz('Asia/Kolkata').format('DD-MM-YYYY')}</td>
              <td>{moment.utc(row.time).tz('Asia/Kolkata').format('hh:mm:ss A')}</td>
              {showCount && <td>{JSON.parse(row.listofpassengers).filter(item=>Object.keys(item).length>0).length} 
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
                      {JSON.parse(row.listofpassengers).filter(item => !Array.isArray(item) || item.length !== 0).map((passenger,index)=>(
                        
                        <tr key={index+1}>
                          <td>{index+1}</td>
                          <td>{passenger.name}</td>
                          <td>{passenger.phone_number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </td>} */}
              { <div>
                {/* <Button onClick={()=>handleStatusClick(index)} variant={row.status === 'Unjoin' ? 'danger' : 'success'}>{row.status}</Button> */}
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
                </div>} 
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableUI;