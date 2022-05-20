import React, { useEffect, useState } from 'react'
import {Nav, Navbar, Container,Image, Dropdown} from 'react-bootstrap'


const Header = () => {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const [userData, setuserData] = useState("");
  useEffect(() => {
  setuserData(userInfo)
  }, []);
  return (
    <Navbar variant="dark" style={{
      backgroundColor:"#3A3845",
      position: "fixed",
      right: "0",
      top:"0",
      width: "100%",
      zIndex:"10",
      boxShadow: "10px 20px 10px #E5E5E5"
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

<Nav className="me-auto">
  <Nav.Link href="/">Home</Nav.Link>
  {!userInfo&& <Nav.Link href="/Login">Login</Nav.Link>}
  {!userInfo&& <Nav.Link href="/register">Register</Nav.Link>}
  {userInfo?.isAdmin&& <Nav.Link href="/dashBoard">Dashboard</Nav.Link>}
  {userInfo&& <Nav.Link href={`/profile/${userInfo._id}`}>My profile</Nav.Link>}

</Nav>
</Container>
</Navbar>
  )
}

export default Header
