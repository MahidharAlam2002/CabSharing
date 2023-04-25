import React, {useState,useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import TableUI from './Table';
import "react-dropdown/style.css";
import "./Search.css"
// import Select from "react-select";
import Dropdown from './Dropdown';
import axios from'axios'
import TableTest from './Tabletest';
import Loading from './Loading';

function SearchAndAddForm() {
  const [formData, setFormData] = useState({
    startPlace: '',
    endPlace: '',
    date: '',
    time: ''
  });
  const [LoadTable,setLoadTable]=useState(true);
  const [loadagain,setloadagain]=useState(false);
  const [response,setresponse]=useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [scheduleDetails, setscheduleDetails] = useState({
    startPlace: '',
    endPlace: '',
    date: '',
    time: ''
  });
  const[ options,setOptions] =useState([]) 
  // [
  //   { value: "IIT Hyderabad", label: "IIT Hyderabad" },
  //   { value: "Secunderabad Railway Station", label: "Secunderabad Railway Station" },
  //   { value: "Rajiv Gandhi International Airport", label: "Rajiv Gandhi International Airport" },
  //   { value: "Miyapur", label: "Miyapur" },
  //   { value: "JBS Bus Stand", label: "JBS Bus Stand" }
  // ];
  const handlescheduledetails=(event)=>{
    const { name, value } = event.target;
    setscheduleDetails({ ...scheduleDetails, [name]: value });
  }
  const cancelButton=()=>{
    document.getElementById("addDialogdiv").style.display="none";
  };

  
  const handleSearch = async () => {
    // Call the search function with formData values
    console.log(formData)
    setLoadTable(true);
    const res=await axios.get('/search',{params:formData});
    console.log(res.data);
    setresponse(res.data);
    setLoadTable(false);
  };
  const confirmButton=()=>{
    // setsc(heduleDetails(scheduleDetails);
    async function InsertData(){
      const res= await axios.get('/createschedule',{params:scheduleDetails});
      // const res2= await axios.get('/createschedule2',{params:scheduleDetails})
    }
    InsertData();
    handleSearch();
    document.getElementById("addDialogdiv").style.display="none";
    // console.log(startPlace);
  };
  const handleAdd = () => {
    // Call the add function with formData values
    document.getElementById("addDialogdiv").style.display="block";
  };

  // const [selectedOptions, setSelectedOptions] = useState();
  // function handleSelect(data) {
  //   setSelectedOptions(data);
  // }
  
  useEffect(()=>{
    handleSearch();
    
  },[])
  useEffect(()=>{
    async function FetchOptions()
    {
      // console.log("fetching")
      try{
      const res=await axios.get('/dropdownlist');
      // console.log("dsfdf",res.data);
      const t=res.data.map((row,index)=>{
        
        return {value:row.place_name,label:row.place_name}
      })
      // console.log("cc",t);
      setOptions(t);
      }
      catch(err)
      {
        console.log("errrr")
        console.log(err);
      }
    }
    FetchOptions();
  },[])
  
  const Valuelist=(jsonList)=>{
    const values=[]
    jsonList.forEach(obj => {
      if (obj["value"]) {
        values.push(obj["value"]);
      }
    });
    return values;
  }
  return (
    <div>
      {/* <TableTest/> */}
      
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundImage:'url("https://lh3.googleusercontent.com/p/AF1QipMttxVTtnaZBUARGuyX6Tk6x6nCNbqng9VJyClc=s1360-w1360-h1020")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '20%',paddingBottom:'100px',paddingTop:'100Px'}}>
      
        <AiOutlineSearch onClick={handleSearch} size={42} style={{ marginRight: 8, cursor: 'pointer' }} />
        
        <div><Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="Start Place"
         
          options={options}
          onChange={(value) =>{ formData.startPlace=Valuelist(value);console.log(value);}}
        />
        </div>
        <div>
        <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="End Place"
          options={options}
          onChange={(value) => {formData.endPlace=Valuelist(value);console.log(value)}}
        />
        </div>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleInputChange}
          style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
        />

        <input
          type="time"
          id="time"
          name="time"
          placeholder="Time"
          value={formData.time}
          onChange={handleInputChange}
          style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 150 }}
        />

      <IoIosAddCircle onClick={handleAdd} size={42} style={{ cursor: 'pointer' }} />
      <div style={{display: "none"}} id="addDialogdiv">
        <div id="myDialog" class="dialog">
          <div id="mydialog-content" class="dialog-content" >
              <div class="dialog-body">
                  <h2>Please provide the details of the schedule</h2>
                  {/* <label for="splace">Start Place : </label>
                  <input type='text' id="splace" onInput={e=>(confirmButton(e))}/>
                  <input type='submit' onSubmit={()=>confirmButton(scheduleDetails.startPlace)}/> */}
                  <label for="splace">Start Place : </label>
                  <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="Start Place"
         
          options={options}
          onChange={(value) =>{ scheduleDetails.startPlace=Valuelist(value);console.log(value);}}
        />
                  {/* <input
                    type="text"
                    id="splace"
                    name="splace"
                    placeholder="Start Place"
                    value={scheduleDetails.startPlace}
                    onChange={handlescheduledetails}
                    // style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
                  /> */}
                  <br></br><br></br>
                
                  <label for="splace">End Place : </label>
                  <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="End Place"
          options={options}
          onChange={(value) => {scheduleDetails.endPlace=Valuelist(value);console.log(value)}}
        />
                  {/* <input
                    type="text"
                    id="eplace"
                    name="eplace"
                    placeholder="End Place"
                    value={scheduleDetails.endPlace}
                    onChange={handlescheduledetails}
                    // style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
                  /> */}
                  <br></br><br></br>
                  <label for="splace">Date : </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="Date"
                    value={scheduleDetails.date}
                    onChange={handlescheduledetails}
                    // style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
                  /><br></br><br></br>
                  <label for="splace">Time : </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    placeholder="Time"
                    value={scheduleDetails.time}
                    onChange={handlescheduledetails}
                    // style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
                  /><br></br><br></br>
                  {/* value={scheduleDetails.startPlace} */}
                  {/* onChange={this.handleChange */}
              </div>
              <div class="dialog-footer">
                  <button id="cancelButton" onClick={()=>cancelButton()}  class="dialog-button">Cancel</button>
                  <button id="okButton" onClick={()=>confirmButton()} class="dialog-button">Confirm</button>
              </div>
          </div>
        </div>
      </div>
      {/* <button onClick={handleAdd}>Add</button> */}
    </div><div>
        {LoadTable?<div><Loading/></div>:<TableUI showStatus={true} showCount={true} data={response} handleSearch={handleSearch}/>}
      </div>
    </div>
  );
}

export default SearchAndAddForm;
