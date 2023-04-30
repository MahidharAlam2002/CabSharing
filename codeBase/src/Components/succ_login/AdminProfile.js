import AdminNavbar from './AdminNavbar';
import React , {useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



function AdminProfile() {

const [data, setData] = useState([]);
const [phoneNumber, setPhoneNumber] = useState('');
const [isEditing, setIsEditing] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
    setErrorMessage('');
  };


  const handleEdit = (event) => {
    setIsEditing(true);
    setPhoneNumber(event.target.value)
  };

useEffect(() =>{
  const handleSearch = async () =>{
    const res = await axios.get('/profile2');
    setData(res.data)
  }
  handleSearch();
}, []);

const handlePhoneNumberSubmit = (e) => {
  e.preventDefault();

  if (!isValidPhoneNumber(phoneNumber)) {
    setErrorMessage('(Please enter a valid 10-digit phone number.)');
    return;
  }

  console.log(`Saving phone number: ${phoneNumber}`);
  
  axios.post('/profile3', { phoneNumber })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
   
    if (phoneNumber.trim() !== '') {
      setIsEditing(false);
    }
  
  }

  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };




  return (

<div><AdminNavbar/>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
    <MDBTypography  className="pt-3 text-center" tag='h2' >My Profile</MDBTypography>
      <MDBContainer className="py-4 h-80">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <img src= {data.photo}
                    className="my-5" style={{ width: '150px' }} fluid />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-5">
                    <MDBTypography tag="h4">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-2">
                      <MDBCol size="8" className="mb-3">
                    <MDBTypography tag="h5">Name</MDBTypography>
                        <MDBCardText className="text-muted">{data.name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="9" className="mb-3">
                    <MDBTypography tag="h5">Email</MDBTypography>
                        <MDBCardText className="text-muted">{data.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="8" className="mb-3">

    <div>
      <form onSubmit={handlePhoneNumberSubmit}>
      <MDBTypography tag="h5">Phone</MDBTypography>
          <input 
                 type="text" 
                 value={phoneNumber || ( isEditing ? '' : data.phone)  } 
                 onChange={handleChange}
                 placeholder="Enter Mobile Number"
                 disabled={!isEditing} 
          />
          
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {isEditing ? (
          <MDBCol  md='5' offsetMd='1' size="4" >
          <MDBRow className="pt-2">
          <Button type="submit" > Save</Button>
          </MDBRow>
          </MDBCol>
          
          
        ) : (
          <MDBCol  md='5' offsetMd='1' size="4" >
          <MDBRow className="pt-2">
          <Button type="button" onClick={handleEdit}>Edit</Button>
          </MDBRow>
          </MDBCol>
        )}
      </form>
    </div>
                    </MDBCol>
                  </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBTypography  className="text-center justify-content-center align-items-center" tag='h2' >
      <Button variant="danger"  type="submit" href='/' onClick={function (){
                    sessionStorage.removeItem('sometoken');
                    axios.get('/logout');
                }}>
        LOG OUT
      </Button>
      </MDBTypography>

    </section>

    </div>
  );
}
export default AdminProfile;