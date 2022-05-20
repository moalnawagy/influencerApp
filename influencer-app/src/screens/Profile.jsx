import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import Header from '../components/Header'
import { useParams, useNavigate } from 'react-router-dom'
import backendAPI from '../api/backendAPI'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PostCard } from '../components/PostCard'
import axios from 'axios'
const defaultPhoto = "https://thumbs2.imgbox.com/af/24/8j6U59Mo_t.jpg"

export const Profile = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [content, setcontent] = useState("");
    const [PagesNum, setPagesNum] = useState(5);
    const [page, setpage] = useState(1);
    const [profileInfo, setprofileInfo] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const [Posts, setPosts] = useState([]);
    let cancelToken
    if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel()
     }
    cancelToken = axios.CancelToken.source()


    

    const getUserById = async()=>{
        backendAPI.get(`/api/users/getUserPosts/${id}?page=${1}`,{headers:{
            authorization: "Bearer " +localStorage.getItem("token")
        }},{cancelToken: cancelToken.token}).then((value)=>{
            if(value.status ==206){
                setcontent(false)
                setprofileInfo(value.data.user)
                console.log(profileInfo);
            }
            if(value.status ==200){
                setcontent(true)
                setprofileInfo(value.data.user)
                setPosts(prev=>{
                    let duplicatedArray = [...prev,...value.data.posts]
                    let uniqueArray = [... new Map(duplicatedArray.map((ele)=>[ele['_id'],ele])).values()]
                    return uniqueArray
                    
                  })
                  setPagesNum(value.data.pages)
            
                  setpage((prev)=> {return prev+1})
            }

            console.log(value.data);
        }).catch((err)=>console.log(err))
    }
    useEffect(() => {
        if(!userInfo){
            navigate("/", {replace:true})
        }
        getUserById()
    
    }, []);
  return (<>
    <Header />
    <Container style={{marginTop:"90px", backgroundColor:"#3A3845",padding:"20px"}}>
        <Row>
           <div style={{color:"white", fontWeight:"bold",fontSize:"30px"}}>
           <Image src={profileInfo? profileInfo.image:defaultPhoto} roundedCircle={true} style={{width:"200px",height:"200px", marginRight:"10px"}} />

{profileInfo? `${profileInfo.first_name} ${profileInfo.last_name} `:""}
           </div> 
        </Row>
       {userInfo.isAdmin&&  <><Row>
            <div style={{padding:"10px"}}>
            Email:  {
                profileInfo?.email
            }
            </div>
            </Row> 
            <Row>
            <div style={{padding:"10px"}}>
            phone:  {
                profileInfo?.phone
            }
            </div>
            </Row> 
            <Row>
            <div style={{padding:"10px"}}>
            Age:  {
                profileInfo?.age
            }
            </div>
            </Row> 
            </>}

{
    content? <InfiniteScroll
    dataLength={Posts.length} 
    next={getUserById}
    hasMore={page < PagesNum+1}
    loader={<div className='center' style={{width:"100%"}}>
    <Spinner animation="grow" />
    </div>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        {userInfo&& <b>You have seen all Posts</b>}
        {!userInfo&& <b>Login To See More Posts</b>}
      </p>
    }
    
  >
  {Posts.map((ele)=>{
          const didUserLiked = userInfo? ele['likes'].find(o=> o._id === userInfo._id): false
          return <PostCard key={ele._id} name={ele.created_by.first_name} 
          image={ele.created_by.image}
          title={ele.title} 
          desc={ele.desc}
        _id={ele._id} 
        likes={ele.noOfLikes}
         createdAt={ele.createdAt} 
         userInfo={userInfo? true:false}
        didUserLiked={didUserLiked} 
        isAdmin={userInfo? userInfo.isAdmin:false}
        isPinned={ele.isPinned}
         />
    
    })}
  </InfiniteScroll>: 
      <div>
      There is no posts
      </div>}



    </Container></>
  )
}
