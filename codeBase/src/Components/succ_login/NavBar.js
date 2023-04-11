import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function NavBar() {
    return ( 
        <div>
            <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Cab Sharing</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/myBookings">My Bookings</Nav.Link>
            <Nav.Link href="/profile">My Profile</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <br />
        </div>

     );
}

export default NavBar;