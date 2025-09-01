"use client"

import api from '@/app/_api/axios'
import React, { useEffect, useState } from 'react'

function Counters() {



    const [users,setUsers] = useState([]);
    const [posts,setPosts] = useState([]);
    const [views,setViews] = useState([]);

    useEffect(() => {
       api.get("/users").then((res) => setUsers(res.data)).catch((e) => console.log("error" , e))
    },[])
    useEffect(() => {
       api.get("/posts").then((res) => setPosts(res.data)).catch((e) => console.log("error" , e))
      
    },[])
      
 
    const getViews = posts.map((post:any) => {
         return post.view;
          }).reduce((acc:any, curr:any) => acc + curr, 0);


  return (
   <div className="counters py-5 px-9 flex gap-14 bg-white rounded-md border justify-around border-[#ccc]">
        <div className="count text-center">
          <h1 className='font-bold text-4xl'>{users.length}</h1>
          <h2>Users</h2>
        </div>
        <div className="count text-center">
          <h1 className='font-bold text-4xl'>{posts.length}</h1>
          <h2>Posts</h2>
        </div>
        <div className="count text-center">
          <h1 className='font-bold text-4xl'>{getViews}</h1>
          <h2>views</h2>
        </div>
      </div>
  )
}

export default Counters
