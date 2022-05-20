import React, { useState, useEffect } from 'react'
import {Form, Button , Row, Col, Spinner, Alert, Container} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import backendAPI from '../api/backendAPI'
import Header from '../components/Header'




 const Login= ()=> {

    

    const token = localStorage.getItem("token")
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [loading, setloading] = useState("");
    const [error, seterror] = useState("");
const [Token, setToken] = useState("");    
    
 const submitHandler = async (event)=>{
        event.preventDefault();
        setloading(true)
        try {
             const user = await backendAPI.post('/api/users/signIn',{email,password })
        if(user.status == 202){
            localStorage.setItem("token",user.data.token)
            localStorage.setItem("userInfo",JSON.stringify(user.data.userInfo))
            setToken(user.data.token)
        }
        } catch (error) {
            setloading(false)
            seterror(true)
        }
       
        
    }

const navigate = useNavigate()
    useEffect(() => {
        if(token){
            navigate('/', { replace: true })
        }
    }, [Token, localStorage.getItem("token")]);
   
    return (
        <>
            <Header />

        <Container style={{marginTop:"90px",maxWidth: "900px",}}>
             <div>
    {error && <Alert variant="danger" onClose={() => seterror(false)} dismissible>
<Alert.Heading>INVALID EMAIL OR PASSWORD</Alert.Heading>

</Alert>}
</div>
<div style={{backgroundColor: "#3A3845",
    padding:"20px",
    borderRadius: "25px",
    minWidth:"500px",
    maxWidth: "800px",
    margin:"50px",
}} >

<Row className="justify-content-center" > <h1 style={{textAlign:"center"}}>Signin</h1></Row>
  <Row className="justify-content-center">
      
    <Col style={{
    color:"white",
    fontSize:"60px",
    fontWeight:"bold",
    letterSpacing:"3px"
    }}>
        join our <div style={{fontSize:"90px",fontWeight:"1500",color:"#EC994B"}}>Family </div> Now</Col>

    <Col>
    



<Form onSubmit={submitHandler}>
<Form.Group className="mb-3" controlId="formBasicEmail" >
<Form.Label>Email address</Form.Label>
<Form.Control type="email" placeholder="Enter email" className='form' onChange={(ele) =>{
setemail(ele.target.value)}} />

</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password" className='form' onChange={
(ele) =>{
setpassword(ele.target.value)}
}/>
</Form.Group>
<Button variant="secondary" type="submit"> 
Submit
</Button>
</Form>
<Row className="py-3">

<Col>
New Customer ? <Link to="/register">Register Here</Link>
</Col>
</Row>
<Row className="py-3">

<Col>
{loading && <Spinner animation="grow" />}

</Col>
</Row>


    </Col>

  </Row>
  </div>
 
</Container>
        
     </>
    )
  }


export default Login