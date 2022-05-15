import backendAPI from '../api/backendAPI'
import React, {useEffect, useState} from 'react'
import { Card, Button, Image, Row, Col } from 'react-bootstrap'
import { PostDropDown } from './PostDropDown'

// props = {title, desc, _id, noLikes, didUserLiked, isAdmin, isPrem, loggedIn, isAllowedToPost }
const likeImg = "https://images2.imgbox.com/ae/e4/KRriXGLk_o.png"
const likedImg = "https://images2.imgbox.com/ff/59/YK7idtVi_o.png"
const token = localStorage.getItem("token")? localStorage.getItem("token"):null
export const PostCard = (props) => {
    const postId = props._id
    const [like, setlike] = useState(false);
    useEffect(() => {
    if(props.didUserLiked){
        setlike(true)
    }
    }, []);
    
  return (

      <div className="d-flex justify-content-center" style={{ padding:"10px", minWidth:"100%",}}>
    <Card className="text-center" style={{backgroundColor:"#FFF6EA", minWidth:"100%", borderRadius:"15px"}} >
  <Card.Body>
    <Row className={postId}>
      <Col>
     <Image 
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
    <Card.Title style={{color:"black", fontSize:"120%"}}>{props.title}</Card.Title>

    <Card.Text style={{color:"black", fontSize:"150%"}}>
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
      </Card.Footer>
</Card>
</div>
  )
}

