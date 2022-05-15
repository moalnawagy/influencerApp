import React, {useState, useEffect} from 'react'
import { Table, Image } from 'react-bootstrap'
import backendAPI from '../api/backendAPI'
import { useNavigate} from 'react-router-dom'


const AllUsers = () => {
  const navigate = useNavigate()

  const [data, setdata] = useState([]);
  useEffect(() => {

    backendAPI.get("/api/users/getAllUsers", {headers:
      {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((result=>{
      console.log(result.data);
      setdata(result.data)
    }))
  }, []);

  return (
    <div 
    style={{
        margin:"100px",
        backgroundColor:"#525E75",
        borderRadius:"15px",
        
    }}
    >
      <Table striped bordered hover style={{border:"none",textAlign:'center'}}>
  <thead>
    <tr>
      <th></th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Phone</th>
      <th>Is Premium</th>
    </tr>
  </thead>
  <tbody >
{  data.map((ele)=> {
  return <tr key={ele._id} onClick={()=>{
    navigate('/', { replace: true })

  }}>
  <td >
    <Image src={ele.image}
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
</tr>

  })}
    
  </tbody>
</Table>
    </div>
  )
}

export default AllUsers
