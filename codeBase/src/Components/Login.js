import Logo from './Logo.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Login() {
    

    return (
    <div style={{alignItems: 'center', display: 'block',height:'100vh', backgroundImage:'url("https://lh3.googleusercontent.com/p/AF1QipMttxVTtnaZBUARGuyX6Tk6x6nCNbqng9VJyClc=s1360-w1360-h1020")',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <div style={{alignItems:'center', marginBottom:'5vh'}}>
            <Navbar >
                <Container>
                    <Navbar.Brand>Cab Sharing</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="https://iith.ac.in/" target='_blank'>IIT Hyderabad</Nav.Link>
                        <Nav.Link href='https://github.com/MahidharAlam2002/CabSharing'target='_blank' >Github Repo</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>

        <div>
            <Container style={{backgroundColor:'white',height: '58vh', marginTop: '20vh', width:'40vh'}}>
                <Row style={{paddingTop:'4vh'}}>
                    <Col style={{textAlign:'center'}}><h1 style={{color:"rgb(25, 55, 109)"}}>Cab Sharing</h1> </Col>
                </Row>

                <Row  style={{paddingTop:"3vh"}}>
                    <Col style={{textAlign:'center'}}><Logo /></Col>
                </Row>

                <Row style={{paddingTop:"1vh",paddingBottom:'2vh'}}>
                    <Col style={{textAlign:'center'}}>
                        <Button variant="outline-primary" type="submit" href='http://localhost:8080/auth/google/home' onClick={function (){sessionStorage.setItem('sometoken','loggedin');}}>
                            Sign In With IITH Google Account
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    
    
    );
}

export default Login;