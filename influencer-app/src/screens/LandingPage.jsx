import axios from 'axios'
import React, { useEffect, useState } from 'react'
import backendAPI from '../api/backendAPI'
import { AddPost } from '../components/AddPost'
import { PostCard } from '../components/PostCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Row, Spinner, Table } from 'react-bootstrap'
import Header from '../components/Header'





export const LandingPage = () => {

  
const loggedIn = localStorage.getItem("token")
const userInfo = JSON.parse(localStorage.getItem("userInfo"))
const [Posts, setPosts] = useState([]);
const [pinned, setpinned] = useState([]);
const [PagesNum, setPagesNum] = useState(5);
const [page, setpage] = useState(1);
const  authorization= loggedIn?("Bearer " +loggedIn):""
let cancelToken
if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel()
  }
cancelToken = axios.CancelToken.source()

const getPinnedPosts = async ()=>{
  try {
    const result = await backendAPI.get(`/api/posts/getPinnedPosts`,{headers:{
      authorization
  }}, {cancelToken: cancelToken.token})
  console.log(result.data.posts);
  setpinned(result.data.posts)
    
  } catch (error) {
    console.log(error);
    
  }
}




     

    const getPosts = async ()=>{
      try {
        const result = await backendAPI.get(`/api/posts/getAllPosts?page=${page}`,{headers:{
          authorization
      }}, {cancelToken: cancelToken.token})
      setPosts(prev=>{
        let duplicatedArray = [...prev,...result.data.posts]
        let uniqueArray = [... new Map(duplicatedArray.map((ele)=>[ele['_id'],ele])).values()]
        return uniqueArray
        
      })
      setPagesNum(result.data.pages)

      setpage((prev)=> {return prev+1})
        
      } catch (error) {
        setPagesNum(0)  
      }
  }

 
useEffect(() => {
  getPosts(page)  
  if(loggedIn){
    getPinnedPosts()
  }
  
}, []);

    

  return (
    <>
        <Header />

  <div style={{marginTop:"80px"}}>
  {loggedIn && <AddPost />}
<Row >
  <Col></Col>

  <Col xs={6}>
  <div style={{minWidth:"550"}}>
  <InfiniteScroll
  dataLength={Posts.length} 
  next={getPosts}
  hasMore={page < PagesNum+1}
  loader={<div className='center' style={{width:"100%"}}>
  <Spinner animation="grow" />
  </div>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      {loggedIn&& <b>You have seen all Posts</b>}
      {!loggedIn&& <b>Login To See More Posts</b>}
    </p>
  }
  
>
{Posts.map((ele)=>{
        const didUserLiked = loggedIn? ele['likes'].find(o=> o._id === userInfo._id): false
        return <PostCard key={ele._id} name={ele.created_by.first_name} 
        image={ele.created_by.image}
        title={ele.title} 
        desc={ele.desc}
      _id={ele._id} 
      likes={ele.noOfLikes}
       createdAt={ele.createdAt} 
       createdBy= {ele.created_by}
       loggedIn={loggedIn? true:false}
      didUserLiked={didUserLiked} 
      isAdmin={userInfo? userInfo.isAdmin:false}
      isPinned={ele.isPinned}
       />
  
  })}
</InfiniteScroll>
</div>
  </Col>

  {loggedIn? <Col>

<div 
  style={{
    top:"0",
    padding:"15px",
    marginLeft:"15px",
    marginTop:"90px",
    marginBottom:"0px",
    position:"fixed",
    overflow:"scroll",
    borderRadius:"15px",

      }}>
    <div 
    style={{

      backgroundColor:"#7F8487",
      borderRadius:"15px",
      padding:"10px",
    }}
    >
     
  <Table striped hover style={{borderRadius:"15px", color:"black"}} bordered={false}>

<thead  style={{textAlign:"center"}}>
 PinnedPosts
</thead>
<tbody>

  {pinned.map((ele)=>{
  return <tr key={`pinned${ele._id}`} onClick={()=>{
    let element =  document.getElementsByClassName(ele._id)[0]
    console.log(element);
    if(element){
      let rect = element.getBoundingClientRect();
      console.log(rect.x);
      if(rect.x>0){
      window.scrollTo(0 , rect.y)

      }else if(rect.x<0){
        window.scrollTo(0 , rect.y)

        }
      else {
        window.scrollTo(0, 50000);
      }
    }
    }}>
      <td>{ele.desc}</td>
    </tr>
})}

</tbody>
</Table>
    </div>
    </div>

</Col>:<Col></Col>
  }
</Row>

 
    </div></>
  )
}
