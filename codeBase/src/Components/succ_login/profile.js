import NavBar from "./NavBar";
import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
// function Profile() {
//     return (  <div><NavBar/>My Profile</div>);
// }
// export default Profile;
import axios from 'axios';

export default function Profile() {
  return (
    <div><NavBar/>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
    <MDBTypography  className="pt-5 text-center" tag='h2' >My Profile</MDBTypography>
      <MDBContainer className="py-5 h-80">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '150px' }} fluid />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-5">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-2">
                      <MDBCol size="8" className="mb-3">
                        <MDBTypography tag="h6">Name:</MDBTypography>
                        <MDBCardText className="text-muted">John Smith</MDBCardText>
                      </MDBCol>
                      <MDBCol size="8" className="mb-3">
                        <MDBTypography tag="h6">E-mail:</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    {/* <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow> */}

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBTypography  className="pt-5 text-center" tag='h2' >
      <Button variant="danger" type="submit" href='/' onClick={function (){
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