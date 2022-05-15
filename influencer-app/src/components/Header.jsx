import React, { Component } from 'react'
import {Nav, Navbar, Container,Image, Dropdown} from 'react-bootstrap'

export default class Header extends Component {
  render() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    

    return (
        <Navbar variant="dark" style={{
          backgroundColor:"#3A3845",
          position: "fixed",
          right: "0",
          top:"0",
          width: "100%",
          zIndex:"10"
        }}>
    <Container >
    <Dropdown>
  <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
      {userInfo&& userInfo.first_name}

  {userInfo&& <Image src={userInfo.image}
      height="40px"
      width="40px"
      roundedCircle="true"
      style={{marginLeft:"10px"}}
       />}
  </Dropdown.Toggle>

  <Dropdown.Menu>
   {userInfo&&  <Dropdown.Item onClick={()=>{localStorage.clear()}} href='/' >Logout</Dropdown.Item>}
   {!userInfo&& 
   <>
    <Dropdown.Item href='/login' >Login</Dropdown.Item>
    <Dropdown.Item href='/register' >Register</Dropdown.Item>
    </>}
  </Dropdown.Menu>
</Dropdown>
    <Navbar.Brand href="/">
      
      </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    )
  }
}
