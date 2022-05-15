import axios from 'axios'
import React, { useEffect, useState } from 'react'
import backendAPI from '../api/backendAPI'
import { AddPost } from '../components/AddPost'
import { PostCard } from '../components/PostCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Row, Spinner, Table } from 'react-bootstrap'





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




useEffect(() => {
  getPosts(page)  
  getPinnedPosts()
  
}, []);


     

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

     

  return (
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
       loggedIn={loggedIn? true:false}
      didUserLiked={didUserLiked} 
      isAdmin={userInfo? userInfo.isAdmin:false}
      isPinned={ele.isPinned}
       />
  
  })}
</InfiniteScroll>
</div>
  </Col>

  <Col>

  <div 
    style={{
      top:"0",
      padding:"15px",
      marginLeft:"15px",
      marginTop:"90px",
      marginBottom:"0px",
      position:"fixed",
      maxHeight:"100%",
      overflow:"scroll",
        }}>
      <div 
      style={{
        backgroundColor:"#FFF6EA",
        borderRadius:"15px",
        paddingBottom:"60px",
      }}
      >
       
    <Table striped hover style={{borderRadius:"15px", color:"black"}} bordered={false}>
  
 
  <tbody>
    <tr onClick={()=>{
    let ele = document.getElementsByClassName("627fbbd4eb04bdd22a2136c0")[0]
    if(ele){
      let rect = ele.getBoundingClientRect();
    window.scrollTo(rect.x , rect.y+ 50)
    }
    }}>
      
      <td>Mark      kmfdomld    gkml</td>
    </tr>

    {pinned.map((ele)=>{
    return <tr key={`pinned${ele._id}`} onClick={()=>{
      let element = document.getElementsByClassName(ele._id)[0]
      if(element){
        let rect = element.getBoundingClientRect();
      window.scrollTo(rect.x , rect.y-20)
      }else{
        window.scrollTo(0 , document.body.scrollHeight)
      }
      }}>
        <td>{ele.desc}</td>
      </tr>
  })}
    <tr>
      <td>Jacob</td>
    </tr>

  </tbody>
</Table>
      </div>
      </div>

  </Col>
</Row>

 
    </div>
  )
}
