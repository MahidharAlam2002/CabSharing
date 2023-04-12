import NavBar from "./NavBar";
import TableUI from "./Table";

function MyBooking() {
    return (  <div><NavBar/><br/><TableUI showStatus={false} showCount={false}/></div>);
}

export default MyBooking;