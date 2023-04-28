import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function AdminNavbar() {
    return ( 
        <div>
            <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Cab Sharing</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/schedules">Schedules List</Nav.Link>
            <Nav.Link href="/users">Users List</Nav.Link>
            <Nav.Link href="/places">Edit Start & End Places</Nav.Link>
            <Nav.Link href="/admin/profile">My Profile</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
        </div>

     );
}

export default AdminNavbar;