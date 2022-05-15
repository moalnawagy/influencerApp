import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import backendAPI from '../api/backendAPI';
const containerStyle= {
    backgroundColor:"#0b2d39",
    height:"100%",
    width:'100%',
    marginTop:'80px',
    borderRadius:"20px",
    justifyContent:"center",
    alignContent:"center",
    padding:"30px"
    }
const boxStyle= {
    width:"100%",
    backgroundColor:"#F0A500",
    padding:"20px 0px 20px 0px",
    color:"white",
    textShadow:" 0 0 8px #000000",
    fontSize:"30px",
    borderRadius:"20px",
    textAlign:"center",
    
    
    
}
const DashBoard = () => {
    const [Statics, setStatics] = useState("");
    const token =localStorage.getItem("token")
    
    const getStatics = async()=>{
    const {data} =await  backendAPI.get("/api/posts/statics",{headers:{
        authorization:`Bearer ${localStorage.getItem("token")}`
    }})
    setStatics(data)
    return data
    }

    useEffect(() => {
        getStatics() 
    }, []);
  return (<Container style={containerStyle}>
      <Row>
          <Col>
          <div style={boxStyle} >
          Number Of Users <br />
            <div style={{fontSize:"100px"}}>{Statics.noOfUsers}</div>
      </div>
          </Col>

          <Col>
          <div style={boxStyle} >
          Number Of Posts <br />
            <div style={{fontSize:"100px"}}>{Statics.noOfPosts}</div>
      </div>
          </Col>

          <Col>
          <div style={boxStyle} >
          Number Of Posts <br />
            <div style={{fontSize:"100px"}}>{Statics.noOfPosts}</div>
      </div>
          </Col>
      </Row>
      <Row>
          <Col></Col>
          <Col xs={6}>hello</Col>
          <Col></Col>
      </Row>
     
    </Container>
  )
}

export default DashBoard
