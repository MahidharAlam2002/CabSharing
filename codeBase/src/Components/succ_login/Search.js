import React, {useState,useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import TableUI from './Table';
import "react-dropdown/style.css";
import "./Search.css"
import Dropdown from './Dropdown';
import axios from'axios'
import Loading from './Loading';
import CreateScheduleDialoguebox from './CreateScheduleDialoguebox';

function SearchAndAddForm() {
  const [formData, setFormData] = useState({
    startPlace: '',
    endPlace: '',
    date: '',
    time: ''
  });
  const [LoadTable,setLoadTable]=useState(true);
  const [response,setresponse]=useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const[ options,setOptions] =useState([]) 
 
  const cancelButton=()=>{
   
  
    document.getElementById("createschedule").style.display="none";

  };

  
  const handleSearch = async () => {
    // Call the search function with formData values
    setLoadTable(true);
    try{
    const res=await axios.get('/search',{params:formData});

    setresponse(res.data);
    }
    catch(err)
    {
      console.log(err);
    }
    
    setLoadTable(false);
  };
  
  const reloadButton=async()=>{
  
    document.getElementById("createschedule").style.display="none";
    await handleSearch();
    
  };
  

  const handleAdd = () => {
   
    document.getElementById("createschedule").style.display="block";

  };


  
  useEffect(()=>{
    handleSearch();
    
  },[])
  useEffect(()=>{
    async function FetchOptions()
    {
    
      try{
      const res=await axios.get('/dropdownlist');
     
      const t=res.data.map((row,index)=>{
        
        return {value:row.place_name,label:row.place_name}
      })
     
      setOptions(t);
      }
      catch(err)
      {
       
        console.log(err);
      }
    }
    FetchOptions();
  },[])
  
  const Valuelist=(jsonList)=>{
    const values=[]
    if(jsonList["value"]!==undefined)
    {
      values.push(jsonList["value"]);
    }
    else{
      jsonList.forEach(obj => {
        if (obj["value"]) {
          values.push(obj["value"]);
        }
      });
    }
   
    return values;
  }

  const [profileDetails,setProfileDetails]=useState({name: '', email:'', phone: ''});
  useEffect(()=>{
    async function FetchProfileDetails()
    {
      try{
        const results= await axios.get('/profile2');
      
        setProfileDetails(results.data);
      
      }catch(err)
      {
        console.log(err);
        return;
      }
    }
    FetchProfileDetails();
    
  },[])
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundImage:'url("https://lh3.googleusercontent.com/p/AF1QipMttxVTtnaZBUARGuyX6Tk6x6nCNbqng9VJyClc=s1360-w1360-h1020")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '20%',paddingBottom:'100px',paddingTop:'100Px'}}>
        <AiOutlineSearch data-testid="searchiconcheck" onClick={handleSearch} size={42} style={{ marginRight: 8, cursor: 'pointer' }} />
        
        <div data-testid="valuelistcheck"><Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="Start Place"
         
          options={options}
          onChange={(value) =>{ formData.startPlace=Valuelist(value);}}
        />
        </div>
        <div>
        <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="End Place"
          options={options}
          onChange={(value) => {formData.endPlace=Valuelist(value);}}
        />
        </div>
        <input
          data-testid="handleinputchangecheck"
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

        <IoIosAddCircle data-testid="addiconcheck" onClick={handleAdd} size={42} style={{ cursor: 'pointer' }} />
        <div id="createschedule" style={{display: "none", width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.4)', position: 'fixed', zIndex: 1, left: 0, top: 0, overflow: 'auto'}}>
          <CreateScheduleDialoguebox cancelButton={cancelButton} reloadButton={reloadButton} options={options} Valuelist={Valuelist} profileDetails={profileDetails}/>
        </div>
     
      </div>
      <div>
          {LoadTable?<div><Loading/></div>:<TableUI showStatus={true} showCount={true} data={response} handleSearch={handleSearch} profileDetails={profileDetails}/>}
      </div>
    </div>
  );
}

export default SearchAndAddForm;
