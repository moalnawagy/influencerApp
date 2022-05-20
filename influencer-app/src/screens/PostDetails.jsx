import backendAPI from '../api/backendAPI'
import React, {useEffect, useState} from 'react'
import { Card, Button, Image, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap'
import { PostDropDown } from '../components/PostDropDown'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

// props = {title, desc, _id, noLikes, didUserLiked, isAdmin, isPrem, loggedIn, isAllowedToPost }
const likeImg = "https://images2.imgbox.com/ae/e4/KRriXGLk_o.png"
const likedImg = "https://images2.imgbox.com/ff/59/YK7idtVi_o.png"
const token = localStorage.getItem("token")? localStorage.getItem("token"):null
const defaultPhoto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522default%2Bprofile%2Bpicture%2522&psig=AOvVaw3vYkYRGJtLw2oURnvLIM9Z&ust=1653001501228000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKj-_c2U6vcCFQAAAAAdAAAAABAD"
export const PostDetails = (props) => {
    const {id} = useParams()
    const postId = id
    const [like, setlike] = useState(false);
    const [Comment, setComment] = useState("");
    const [Data, setData] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const getPostById = async()=>{
        backendAPI.get(`/api/posts/getPostById/${id}`,{comment:Comment,postId},{headers:{
            authorization: "Bearer " +localStorage.getItem("token")
        }}).then((value)=>{
            setData(value.data.post)
            console.log(value.data.post.comments);
        }).catch((err)=>console.log(err))

    }
    const AddComment = async(event)=>{
      event.preventDefault();

      backendAPI.put('/api/posts/addComment',{comment:Comment,postId},{headers:{
        authorization: "Bearer " +localStorage.getItem("token")
    }}).then((value)=>{
      console.log(value);
    }).catch((err)=>console.log(err))
    }
        useEffect(() => {
    if(props.didUserLiked){
        setlike(true)
    }
    getPostById()
    }, []);
  return (
    <>
          <Header />

      <div className="d-flex justify-content-center" style={{ padding:"10px", minWidth:"100%",marginTop:"100px"}}>
    <Card className="text-center" style={{backgroundColor:"#FFF6EA", maxWidth:"421.5px", borderRadius:"15px"}} >
  <Card.Body className={postId}>
    <Row >
      <Col>
     <Image 
      src={Data.created_by?.image} 
      width='50px'
      height='50px'
      roundedCircle={true}
       /> {Data.created_by?.first_name} 
      </Col>
      <Col>
      {(userInfo.isAdmin&& <PostDropDown id={postId} isPinned={Data.isPinned} />)}
      </Col>

    </Row>
    
    <Card.Title id={`title${postId}`} style={{color:"black", fontSize:"120%"}}>{Data.title}</Card.Title>

    <Card.Text id={`desc${postId}`}  style={{color:"black", fontSize:"150%"}}>
      {Data.desc}
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
          <Col> Created At: {Data.createdAt}</Col>
          <Col>Lieked By: {Data.likes?.length}</Col>
      </Row>
      {
        Data? Data.comments.map((ele)=>{
          return <>
          <hr style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray"}}></hr>

          <div style={{margin:"7px"}}>
          <Image width="30px" height="50px" roundedCircle={true} src={Data? ele.created_by.image:defaultPhoto} />
          {Data? ele.created_by.first_name:""}
          </div>
          
        <Row> <Col> {Data? ele.comment:""}</Col></Row> 
        </>
        }):""
      }

      <Form onSubmit={AddComment}>
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
</Form>
      
      </Card.Footer>
</Card>
</div></>
  )
}

