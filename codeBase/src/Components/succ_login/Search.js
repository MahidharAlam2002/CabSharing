import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import TableUI from './Table';

function SearchAndAddForm() {
  const [formData, setFormData] = useState({
    startPlace: '',
    endPlace: '',
    date: '',
    time: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    // Call the search function with formData values
    console.log(formData)
  };

  const handleAdd = () => {
    // Call the add function with formData values
  };

  return (
    <div >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginRight: 100  }}>
        <AiOutlineSearch onClick={handleSearch} size={32} style={{ marginRight: 8, cursor: 'pointer' }} />
        <input
          type="text"
          id="startPlace"
          name="startPlace"
          placeholder="Start Place"
          value={formData.startPlace}
          onChange={handleInputChange}
          style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
        />

        <input
          type="text"
          id="endPlace"
          name="endPlace"
          placeholder="End Place"
          value={formData.endPlace}
          onChange={handleInputChange}
          style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
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
      </div>

      <div>
        <TableUI showStatus={true} showCount={true}/>
      </div>
    </div>
  );
}

export default SearchAndAddForm;