import React, {useState} from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import backendAPI from '../api/backendAPI';



export const AddPost = () => {

    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [varient, setvarient] = useState("");
    const onAddPost = (event)=>{
        event.preventDefault();
        setloading(true)
        backendAPI.post("/api/posts/addPost", {title, desc}, {headers:{
            authorization: "Bearer " +localStorage.getItem("token")
        }}).then((r)=>{
            setloading(false)
           
            statusHandler(r.status)


        }).catch((err)=>{
          setloading(false)
          console.log(err);
        })

    }

const statusHandler = (status)=>{
    switch(status){
        case 201:
            setvarient("success")
    }

}

    
  return (<>
  <div className='container ' style={{
    "backgroundColor":"#FFF6EA",
    color:"black", 
    padding:"15px",
    maxWidth:"421.5px",
  borderRadius:"15px",
  
}}>
    <h1 style={{color:"black"}}> Add Post</h1>
    <Form onSubmit={onAddPost}>
    <Form.Group className="mb-3" onChange={(event)=>{
        settitle(event.target.value)
    }}>
      <Form.Label>Title</Form.Label>
      <Form.Control type="textarea" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Post</Form.Label>
      <Form.Control as="textarea" rows={3} onChange={(event)=>{
        setdesc(event.target.value)
    }}/>
    </Form.Group>
    <Button variant="outline-dark" type="submit">
    Add
  </Button>
  </Form>
  {loading&& <Spinner  animation="grow" />}
  {varient&& <Alert variant={varient}> added </Alert>}
  </div>
  </>
  )
}
