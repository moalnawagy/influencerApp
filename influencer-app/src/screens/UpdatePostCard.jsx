import React, {useState} from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import backendAPI from '../api/backendAPI';
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header';


 const UpdatePostCard = () => {
   const navigate = useNavigate()
   const {Title, Desc, ID} = useParams()

    const [title, settitle] = useState(Title);
    const [desc, setdesc] = useState(Desc);
    const [loading, setloading] = useState(false);
    const [varient, setvarient] = useState("");
    const onAddPost = (event)=>{
        event.preventDefault();
        setloading(true)
        backendAPI.put("/api/posts/updatePost", {title, desc, id:ID}, {headers:{
            authorization: "Bearer " +localStorage.getItem("token")
        }}).then((r)=>{
            setloading(false)
            statusHandler(r.status)
            navigate("/")


        }).catch((err)=>{
          setloading(false)
          console.log(err);
        })

    }

const statusHandler = (status)=>{
    if(status == 201){
      
            setvarient("success")
    }else{
      setvarient("warning")
    }

}

    
  return (<>
      <Header />

  <div className='container ' style={{
    "backgroundColor":"#FFF6EA",
    marginTop:"100px",
    color:"black", 
    padding:"15px",
    maxWidth:"421.5px",
  borderRadius:"15px",
  
}}>
    <h1 style={{color:"black"}}> Update Post</h1>
    <Form onSubmit={onAddPost}>
    <Form.Group className="mb-3" onChange={(event)=>{
        settitle(event.target.value)
    }}>
      <Form.Label>Title</Form.Label>
      <Form.Control value={title} type="textarea" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Post</Form.Label>
      <Form.Control as="textarea" rows={3} value={desc} onChange={(event)=>{
        setdesc(event.target.value)
    }}/>
    </Form.Group>
    <Button variant="outline-dark" type="submit">
    Update
  </Button>
  </Form>
  {loading&& <Spinner  animation="grow" />}
  {varient=="success"&& <Alert variant={varient}> Updated </Alert>}
  {varient=="warning"&& <Alert variant={varient}> Failed To Update </Alert>}

  </div>
  </>
  )
}
export default UpdatePostCard