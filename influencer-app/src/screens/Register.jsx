import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, Spinner } from "react-bootstrap"
import backendAPI from '../api/backendAPI'
import { useNavigate} from 'react-router-dom'


 const Register = () => {
  
   const [firstName, setfirstName] = useState("");
   const [lastName, setlastName] = useState("");
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");
   const [age, setage] = useState("");
   const [number, setnumber] = useState("");
   const [image, setimage] = useState("");
   const [plane, setplane] = useState("");
   const [loading, setloading] = useState(false);
   const [Token, setToken] = useState("");

  const UploadImage= async (files)=>{
    const token = localStorage.getItem("token")
  const formData = new FormData()
  formData.append("file", files.target.files[0])
  formData.append("cloud_name", "tantauniversitylibrary")
  formData.append("api_key", "616639424788384")
  formData.append("api_secret", "g7EY5OAq6lFSSlqtTEhxyUFQ-Ow")
  formData.append("upload_preset", "kk8vtpv2")
  axios.post("https://api.cloudinary.com/v1_1/tantauniversitylibrary/image/upload", formData).then((ress)=>{
  console.log(ress.data.url);
  setimage(ress.data.url)
})
  }

  const submitHandler = async(event)=>{
    event.preventDefault();
    setloading(true)
    backendAPI.post("/api/users/signup", {
      first_name:firstName,
      last_name:lastName,
      email,
      password, 
      age,
      phone:number,
      image,
      plane
    }).then((res)=>{
      setloading(false)
      localStorage.setItem("token", res.data.token )
      localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo))
      setToken(res.data.token)
      localStorage.setItem("isPrem", res.data.isPrem )
      
      console.log(res.data);
    })
  }



  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem("token"))

  }, []);
  if(Token){
    navigate('/', { replace: true })
}


  return (
    <div className='d-flex justify-content-center' style={{
      backgroundColor:"#FFF6EA",
      borderRadius:"25px"
      }}>
    <Form onSubmit={submitHandler}>
    <div className='d-flex justify-content-center'>
    <h3 style={{color:"#adafae"}}>Sign Up</h3>
    </div>
    <div className="mb-3">
      <label>First name</label>
      <input
        type="text"
        className="form-control"
        placeholder="First name"
        style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}}
        onChange={(e)=>{
          setfirstName(e.target.value)
        }}
      />
    </div>
    <div className="mb-3">
      <label>Last name</label>
      <input type="text" style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}} 
      className="form-control" 
      placeholder="Last name"
      onChange={(e)=>{
        setlastName(e.target.value)
      }} />
    </div>
    <div className="mb-3">
      <label>Email address</label>
      <input
      style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}} 
        type="email"
        className="form-control"
        placeholder="Enter email"
        onChange={(e)=>{
          setemail(e.target.value)
        }}
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <input
      style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}} 
        type="password"
        className="form-control"
        placeholder="Enter password"
        onChange={(e)=>{
          setpassword(e.target.value)
        }}
      />
    </div>

    <div className="mb-3">
      <label>Age</label>
      <input
      style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}} 
        type="number"
        max={"100"}
        min={"18"}
        className="form-control"
        placeholder="Enter Your Age"
        onChange={(e)=>{
          setage(e.target.value)
        }}
      />
    </div>


    <div className="mb-3">
      <label>Phone</label>
      <input
      style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}} 
        type="number"
        className="form-control"
        placeholder="Enter Your phone number"
        onChange={(e)=>{
          setnumber(e.target.value)
        }}
      />
    </div>
    

    <div className="mb-3" >
      <label>Plane</label>
      <Form.Select 
      onChange={async (e)=>{
        setplane(e.target.value)
      }}
      value={plane}
      style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}} 
      aria-label="Default select example">
  <option value="">Open this select menu</option>
  <option value="basic">Basic</option>
  <option value="premium">Premium</option>
</Form.Select>
    </div>
 
    <div className="mb-3">
      <label>Image</label>
      <input type="file" onChange={UploadImage} style={{boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)"}} className="form-control" placeholder="Last name" />
    </div>

    <div className="d-grid">
      <button type="submit"  className="btn btn-dark">
        Sign Up
      </button>
    </div>


    <p className="forgot-password text-right">
      Already registered <a href="/login">sign in?</a>
    </p>
  </Form>
  {loading && <Spinner animation="grow" />}

  </div>
  )
}
export default Register