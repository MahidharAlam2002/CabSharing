import NavBar from "./NavBar";
import TableUI from "./Table";
import axios from 'axios';
import { useEffect, useState } from 'react'
function MyBooking() {
    const [response,setresponse]=useState(null);
    useEffect(()=>{
        async function FetchData(){
            const res= await axios.get('/mybooking')
            setresponse(res.data);
        }
        FetchData();
    },[])
    return (  <div><NavBar/><br/><TableUI showStatus={false} showCount={false} data={response}/></div>);
}

export default MyBooking;