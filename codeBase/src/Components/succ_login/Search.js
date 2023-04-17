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

  const handleSearch = async () => {
    // Call the search function with formData values
    console.log(formData)
    const res=await axios.get('/search',{params:formData});
    console.log(res.data);
    setresponse(res.data);
  };

  const handleAdd = () => {
    // Call the add function with formData values
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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginRight: 100 }}>
        <AiOutlineSearch onClick={handleSearch} size={32} style={{ marginRight: 8, cursor: 'pointer' }} />
        <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="Start Place"
          value={formData.startPlace}
          options={options}
          onChange={(value) => console.log(value)}
        />

        <Dropdown
          isSearchable={true}
          isMulti={true}
          placeHolder="End Place"
          options={options}
          onChange={(value) => console.log(value)}
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
      {/* <button onClick={handleAdd}>Add</button> */}
    </div><div>
        <TableUI showStatus={true} showCount={true} data={response}/>
      </div>
    </div>
  );
}

export default SearchAndAddForm;
