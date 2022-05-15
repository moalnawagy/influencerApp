import React from 'react'
import { Dropdown } from 'react-bootstrap'
import backendAPI from '../api/backendAPI'

export const PostDropDown = (props) => {

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
  console.log(props.isPinned);
  return (
    <Dropdown>
  <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href='/' onClick={{}}>Update</Dropdown.Item>
    <Dropdown.Item href='/' onClick={handledelete}>Delete</Dropdown.Item>
    {!props.isPinned&& <Dropdown.Item href='/' onClick={handlePin}>Pin</Dropdown.Item>}
    {props.isPinned&& <Dropdown.Item href='/' onClick={handleunPin}>UnPin</Dropdown.Item>}
  </Dropdown.Menu>
</Dropdown>
  )
}
