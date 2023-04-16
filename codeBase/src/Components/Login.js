import Logo from './Logo.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Login() {
    

    return (
    <div style={{alignItems: 'center', display: 'flex', backgroundImage:'url("https://lh3.googleusercontent.com/p/AF1QipMttxVTtnaZBUARGuyX6Tk6x6nCNbqng9VJyClc=s1360-w1360-h1020")',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>

        <Container style={{height: '100vh', paddingTop: '170px', width:'30%'}}>
            <Row style={{backgroundColor:'white',paddingTop:'30px'}}>
                <Col style={{textAlign:'center'}}><h1 style={{color:"rgb(25, 55, 109)"}}>Cab Sharing</h1> </Col>
            </Row>

            <Row  style={{paddingTop:"25px", backgroundColor:'white'}}>
                <Col style={{textAlign:'center'}}><Logo /></Col>
            </Row>

            <Row style={{paddingTop:"25px", backgroundColor:'white',paddingBottom:'20px'}}>
                <Col style={{textAlign:'center'}}>
                {/* <form action='../../auth/google/home' method='post'> */}
                <Button variant="outline-primary" type="submit" href='http://localhost:8080/auth/google/home' onClick={function (){
                    sessionStorage.setItem('sometoken','loggedin');
                }}>
        Sign In With IITH Google Account
      </Button>
{/* </form> */}


                </Col>
            </Row>
        </Container>
    </div>
    
    
    );
}

export default Login;