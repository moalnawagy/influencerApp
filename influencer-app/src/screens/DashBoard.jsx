import React, { useEffect, useState } from 'react'
import { Col, Container, Dropdown, Image, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backendAPI from '../api/backendAPI';
import Header from '../components/Header';

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
  const navigate = useNavigate()
    const [Statics, setStatics] = useState("");
    const token =localStorage.getItem("token")

    const [data, setdata] = useState([]);
    useEffect(() => {

    backendAPI.get("/api/users/getAllUsers", {headers:
      {
        authorization: `Bearer ${token}`
      }
    }).then((result=>{
      setdata(result.data)
    }))
    getStatics()
  }, []);
    
    const getStatics = async()=>{
    const {data} =await  backendAPI.get("/api/posts/statics",{headers:{
        authorization:`Bearer ${token}`
    }})
    setStatics(data)
    console.log(data);
    return data
    }

  const handleDeleting=async(id)=>{
    backendAPI.delete("/api/users/deleteByID",{headers:{
        authorization:`Bearer ${token}`
    },
    data:{id}
}).then((r=>{
    window.location.reload()
    }))

  }

  return (<>
      <Header />

  <Container style={containerStyle}>
      <Row style={{marginBottom:"20px"}}>
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
          Number Of All Reaches <br />
            <div style={{fontSize:"100px"}}>{Statics.noOfAllReachs}</div>
      </div>
          </Col>
      </Row>
      <Row>
          <Col>
          <div style={boxStyle} >
          Number Of Today Reaches <br />
            <div style={{fontSize:"100px"}}>{Statics.noOfTodayReachs}</div>
      </div>
          </Col>

          <Col>
          <div style={boxStyle} >
          Number Of Today Posts <br />
            <div style={{fontSize:"100px"}}>{Statics.noOfTodayPosts}</div>
      </div>
          </Col>

          <Col>
          <div style={boxStyle} >
          Number Of Yesterday Posts <br />
            <div style={{fontSize:"100px"}}>{Statics.noOfYesterdayPosts}</div>
      </div>
          </Col>
      </Row>
      <div 
    style={{
        margin:"100px",
        backgroundColor:"#525E75",
        borderRadius:"15px",        
    }}
    >
      <Table striped bordered hover style={{textAlign:'center'}}>
  <thead>
    <tr>
      <th></th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Phone</th>
      <th>Is Premium</th>
      <th>Control</th>
    </tr>
  </thead>
  <tbody >
{  data.map((ele)=> {
  return <tr key={ele._id}>
  <td >
    <Image src={ele.image}
    onClick={()=>{
      navigate(`/profile/${ele._id}`, {replace:true})
    }}
    height="40px"
    width="40px"
    roundedCircle={true}
    ></Image>
    </td>
  <td>{ele.first_name}</td>
  <td>{ele.last_name}</td>
  <td>{ele.email}</td>
  <td>{ele.age}</td>
  <td>{ele.phone}</td>
  <td>{ele.isPremium.toString()}</td>
  <td><Dropdown>
  <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
    Controle
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={()=>{
        handleDeleting(ele._id)
    }}>Delete</Dropdown.Item>
    {!ele.isPremium&& <Dropdown.Item onClick={()=>{
        handleDeleting(ele._id)
    }}>Upgrade To Premium</Dropdown.Item>}
  </Dropdown.Menu>
</Dropdown></td>
</tr>

  })}
    
  </tbody>
</Table>
    </div>
     
    </Container></>
  )
}

export default DashBoard
