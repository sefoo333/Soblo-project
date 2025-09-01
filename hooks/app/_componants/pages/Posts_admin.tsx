"use client"
import { Badge } from '@/components/ui/badge'
import { Eye, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '@/app/_api/axios'
import { post } from '@/app/interfaces/user'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function Posts_admin() {


     const [data,setData] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log("error => " , e)
    })

        
    
  } ,[])

  const DeletePost = async (id:string) => {
    api.delete(`/posts/deletePost/${id}`, {
      headers: {
        "x-auth-header": localStorage.getItem("token")
      }
    }).then(() => {
      console.log("success")
    }).catch((e) => {
      console.log("error => " + e)
    })
}


 

  return (
    <>
    <Toaster position="top-right" />
     <div className="window w-full py-10 px-8">
        <h1 className='text-4xl font-bold pb-6'>Posts</h1>
          <div className="last_logins py-5 px-9  border border-[#ccc] bg-white mt-10 rounded-md">
<div className="flex justify-between  flex-col">
          <h1 className='font-semibold text-start mb-5'>Posts</h1>
         <div>
             {data.map((e:post) => (
 <div id={e._id} className="student flex justify-between  py-5 items-center border-b border-b-[#ccc]">
                 <div className="so flex gap-4">
              <Image src={e.Banner} width={300} height={150} alt='' className="img w-10 h-10 max-md:w-full object-cover bg-slate-300 rounded-md" />
                  <div className="text">
                    <h1 className='font-semibold text-md'>{e.PostName}</h1>
                    <h1 className='text-sm'>views: {e.view}</h1>
                  </div>
                 </div>
                 <div className="more">
                  <DropdownMenu>
  <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Post Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() =>{
        DeletePost(e._id)
        toast("Post Deleted Successfully", {
          description: "The post has been deleted successfully.",
          duration: 3000,
          style: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
          },
        })
    }} className='text-red-500'>Delete</DropdownMenuItem>
    <DropdownMenuItem><Link href={`/${e._id}`} target='_blank'>Go To post</Link></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                 </div>
                 </div>
     ))}
         </div>

</div>

<div className="create flex justify-end mt-5">
    <Link href={'/create_post'}>
        <Button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create Post</Button>
    </Link>
</div>
       
 
      </div>
    </div>
    </>
  )
}

export default Posts_admin
