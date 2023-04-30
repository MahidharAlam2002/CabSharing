import NavBar from "./NavBar";
import TableUI from "./Table";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyBooking.css'
function MyBooking() {
    const [current,setcurrent]=useState(null);
    const [past,setpast]=useState(null);
    useEffect(()=>{
        async function FetchData(){
            const res= await axios.get('/mycurrentbooking');
            const pas=  await axios.get('/mypastbooking');
            setcurrent(res.data);
            setpast(pas.data);

            
        }
        FetchData();
    },[])
    const [open, setOpen] = useState(true);
    const [open2,setOpen2]=useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
    const handleClick2 = () => {
      setOpen2(!open2);
    };
  
    return (<div>
    <NavBar/><br/>
    <div>
      <button data-testid='btnUpcomingBooking' className="tog-cal2 itin-det-btn" onClick={handleClick}>
        <div className="pd">Upcoming Booking</div>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      </button>
    </div>
    <Collapse in={open}>
      <div className="" >
        <TableUI data-testid="TbUB" showStatus={false} showCount={false} data={current} profileDetails={{name: '', email:'', phone: ''}}/>
      </div>
    </Collapse>
    <div>
      <button data-testid='btnPastBooking' className="tog-cal2 itin-det-btn" onClick={handleClick2}>
        <div className="pd">Past Booking</div> 
        <FontAwesomeIcon data-testid="TbPB" icon={open2 ? faChevronUp : faChevronDown} />
      </button>
    </div>
    <Collapse in={open2}>
    <div>
      <TableUI data-testid="TbPB" showStatus={false} showCount={false} data={past} profileDetails={{name: '', email:'', phone: ''}} />
    </div>
    </Collapse>
  </div>);
}

export default MyBooking;