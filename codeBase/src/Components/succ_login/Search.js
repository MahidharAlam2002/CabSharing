import React, {useState,useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import TableUI from './Table';
import "react-dropdown/style.css";
// import Select from "react-select";
import Dropdown from './Dropdown';
import axios from'axios'

function SearchAndAddForm() {
  const [formData, setFormData] = useState({
    startPlace: '',
    endPlace: '',
    date: '',
    time: ''
  });
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

  const handlescheduledetails=(event)=>{
    const { name, value } = event.target;
    setscheduleDetails({ ...scheduleDetails, [name]: value });
  }
  const cancelButton=()=>{
    document.getElementById("addDialogdiv").style.display="none";
  };

  const confirmButton=()=>{
    // setsc(heduleDetails(scheduleDetails);
    async function InsertData(){
      const res= await axios.get('/createschedule',{params:scheduleDetails});
      const res2= await axios.get('/createschedule2',{params:scheduleDetails})
    }
    InsertData();
    document.getElementById("addDialogdiv").style.display="none";
    // console.log(startPlace);
  };
  const handleSearch = async () => {
    // Call the search function with formData values
    console.log(formData)
    const res=await axios.get('/search',{params:formData});
    console.log(res.data);
    setresponse(res.data);
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
  const options = [
    { value: "IIT Hyderabad", label: "IIT Hyderabad" },
    { value: "Secunderabad Railway Station", label: "Secunderabad Railway Station" },
    { value: "Rajiv Gandhi International Airport", label: "Rajiv Gandhi International Airport" },
    { value: "Miyapur", label: "Miyapur" },
    { value: "JBS Bus Stand", label: "JBS Bus Stand" }
  ];
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginRight: 100 }}>
        <AiOutlineSearch onClick={handleSearch} size={32} style={{ marginRight: 8, cursor: 'pointer' }} />
        <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="Start Place"
         
          options={options}
          onChange={(value) =>{ formData.startPlace=Valuelist(value);console.log(value);}}
        />

        <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="End Place"
          options={options}
          onChange={(value) => {formData.endPlace=Valuelist(value);console.log(value)}}
        />

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

      <IoIosAddCircle onClick={handleAdd} size={32} style={{ cursor: 'pointer' }} />
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
        <TableUI showStatus={true} showCount={true} data={response} handleSearch={handleSearch}/>
      </div>
    </div>
  );
}

export default SearchAndAddForm;
