import React, { useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import backendAPI from '../api/backendAPI'
import { useNavigate } from "react-router-dom";
export const PostDropDown = (props) => {

  const navigate = useNavigate()



  const handlePin = async()=>{
    const pin =await backendAPI.put('/api/posts/pinPost',{id:props.id},{
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    } )
  }

  const handleunPin = async()=>{
    const pin =await backendAPI.put('/api/posts/unpinPost',{id:props.id},{
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    } )
  }

  const handledelete = async()=>{
    const deleting =await backendAPI.delete('/api/posts/deletePost',{
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data:{id:props.id}
    } )
  }

  const handleUpdate = async()=>{
    let Title = document.getElementById(`title${props.id}`).innerHTML
    let Desc = document.getElementById(`desc${props.id}`).innerHTML

    console.log(Title);
    console.log(Desc);
    navigate(`/updatePost/${Title}/${Desc}/${props.id}` ,{ replace: true })


    
  }


  return (
    <Dropdown>
  <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={handleUpdate}>Update</Dropdown.Item>
    <Dropdown.Item href='/' onClick={handledelete}>Delete</Dropdown.Item>
    {!props.isPinned&& <Dropdown.Item href='/' onClick={handlePin}>Pin</Dropdown.Item>}
    {props.isPinned&& <Dropdown.Item href='/' onClick={handleunPin}>UnPin</Dropdown.Item>}
  </Dropdown.Menu>
</Dropdown>
  )
}
