import backendAPI from '../api/backendAPI'
import React, {useEffect, useState} from 'react'
import { Card, Button, Image, Row, Col, Form, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { PostDropDown } from './PostDropDown'
import { useNavigate } from 'react-router-dom'


// props = {title, desc, _id, noLikes, didUserLiked, isAdmin, isPrem, loggedIn, isAllowedToPost }
const likeImg = "https://images2.imgbox.com/ae/e4/KRriXGLk_o.png"
const likedImg = "https://images2.imgbox.com/ff/59/YK7idtVi_o.png"
const token = localStorage.getItem("token")? localStorage.getItem("token"):null
export const PostCard = (props) => {
    const navigate= useNavigate()
    const postId = props._id
    const [like, setlike] = useState(false);
    const [Comment, setComment] = useState("");
    const [loading, setloading] = useState(false);
    useEffect(() => {
    if(props.didUserLiked){
        setlike(true)
    }
    }, []);

    const AddComment = async(event)=>{
      event.preventDefault();
      setloading(true)
      backendAPI.put('/api/posts/addComment',{comment:Comment,postId},{headers:{
        authorization: "Bearer " +localStorage.getItem("token")
    }}).then((value)=>{
      setloading(true)
     window.location.reload();
    }).catch((err)=>console.log(err))
    setloading(false)
    }
    
  return (

      <div className="d-flex justify-content-center" style={{ padding:"10px", minWidth:"100%"}}>
    <Card className="text-center" style={{backgroundColor:"#FFF6EA", maxWidth:"421.5px", borderRadius:"15px"}} >
  <Card.Body className={postId}>
    <Row >
      <Col>
     <Image 
     onClick={()=>{
      navigate(`/profile/${props.createdBy._id}`, {replace:true})
    }}
      src={props.image} 
      width='50px'
      height='50px'
      roundedCircle={true}
       /> {props.name} 
      </Col>
      <Col>
      {(props.isAdmin&& <PostDropDown id={postId} isPinned={props.isPinned} />)}
      </Col>

    </Row>
    
    <Card.Title onClick={()=>{
      navigate(`/PostDetails/${postId}`)

    }} id={`title${postId}`} style={{color:"black", fontSize:"120%"}}>{props.title}</Card.Title>

    <Card.Text onClick={()=>{
      navigate(`/PostDetails/${postId}`)

    }} id={`desc${postId}`}  style={{color:"black", fontSize:"150%"}}>
      {props.desc}
    </Card.Text>
   {token&& <Button variant="" onClick={async ()=>{
        setlike(!like)
        if(!like){
            await backendAPI.post('api/posts/AddLike', {post:postId}, {headers:{
                authorization: "Bearer "+token
            }})
        }else{
            await backendAPI.post('api/posts/removeLike', {postId}, {headers:{
                authorization: "Bearer "+token
            }})
        }
    }}> <Image src={like? likedImg: likeImg} height={"50px"}></Image></Button>}
  </Card.Body>
  <Card.Footer>
      <Row>
          <Col> Created At: {props.createdAt}</Col>
          <Col>Lieked By: {props.likes}</Col>
      </Row>
      {token&&<Form onSubmit={AddComment}>
  <Row className="align-items-center">
    <Col className="my-1">
      <Form.Control id="inlineFormInputName" placeholder="Leave a comment" value={Comment}
      onChange={(e)=>{setComment(e.target.value);}}
       />
    </Col>
    <Col xs="auto" className="my-1">
      <Button variant='outline-secondary' type="submit">Submit</Button>
    </Col>
  </Row>
</Form> }
      
      {loading&& <Spinner animation="grow" />}
      </Card.Footer>
     
      </Card>
</div>
  )
}

