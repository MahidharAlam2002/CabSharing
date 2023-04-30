import React, { useState,useEffect } from 'react';
import { Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Dialoguebox.css";
import axios from 'axios';

import TableTest from './Tabletest';
import Loading from './Loading';
import JoinDialoguebox from './JoinDialoguebox';
function TableUI(props) {
  const [data, setData] = useState([
   
  ]);
  const [LoadTable,setLoadTable]=useState(true);
  const profileDetails=props.profileDetails;
  const [rerender,setrerender]=useState(false);
  // const [showJoin,setshowJoin]=useState(false);
  const handleStatusClick = (index) => {
    document.getElementById(index+"join").style.display="block";
    // setshowJoin(true);
  };
  
  

  const cancelButton=(index)=>{
    document.getElementById(index+"join").style.display="none";
    // setshowJoin(false);
  };
  
  const confirmButton=async(status, index)=>{
    const newData=[...data];
    document.getElementById(index+"join").style.display="none";
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
    
    
    // setshowJoin(false);
   
  };
  useEffect(()=>{
    
    if(props.data)
     { 
      // console.log(props.data);
      setData(props.data)
      setLoadTable(false);
    }
      
  },[props.data,rerender])
  const showStatus=props.showStatus;
  const showCount=props.showCount;
  // console.log(props);
  return (
    <div className="container">
      
      <Table data-testid="TableTableUI">
        <tbody>
          {LoadTable? <div><Loading/></div>:data.map((row, index) => (
            <tr key={row.schedule_id}>
              <TableTest row={row} handleStatusClick={handleStatusClick} index={index} showCount={showCount} showStatus={showStatus}/>
              {  <div>
                  <div data-testid="indexjoin" id={index+"join"} style={{display: "none", width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.4)', position: 'fixed', zIndex: 1, left: 0, top: 0, overflow: 'auto'}}>
                    <JoinDialoguebox profileDetails={profileDetails} row={row} index={index} status={row.status} confirmButton={confirmButton} cancelButton={cancelButton} />
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