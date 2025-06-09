"use client"
import React, { createContext, useEffect, useState } from 'react'
import Navbar from '../_componants/small_comps/Navbar'
import { Eye, GitCommitVerticalIcon, Heart, MessageCircle, Share } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Editor from '../_componants/small_comps/Editor'
import api from '../_api/axios'
import { post } from '../interfaces/user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { ShareContent } from './context'


function page() {

  const router = useRouter()
  
  const [imageUrl, setImageUrl] = useState("/");
  const [content,setContent]:any = useState({});
  const [Title,setTitle] = useState("seff");
  const [tags,setTags] = useState("")
  const CreatePost = async (e?:post) => {
    api.post("/posts/createPost" , {
      postName:Title,
      Banner:imageUrl,
      content:content,
      tags:tags.split("-"),
      Date:new Date().toLocaleDateString(),
    } , {
      headers:{
        "x-auth-header":localStorage.getItem("token")
      }
    }).then((res) => {
router.push(`/${res.data.id}`)
      toast.success("Post Created Successfully")
    }).catch((err) => {
      console.log("error => ", err)
      toast.error("Error Creating Post")
    })
  }


  useEffect(() => {
    if (localStorage.getItem("admin_sAs_admin") === null) {
      router.push("/")
    }
  } , [])


    
      const handleUpload = async (event:any) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData:any = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sobloo");
    
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dj2rasyos/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
    
        const data = await response.json();
        setImageUrl(data.secure_url);
       
      }


  return (
 <>
 <Toaster />
 <Navbar />
   <div className="parent w-full flex justify-center">
<div className="container  w-[48rem] py-10">
    <div className="header my-4 mb-10">

<Input type='text' onChange={(e) => setTitle(e.target.value)} defaultValue={"Write Here"} className='text-6xl font-bold' />        
    </div>
    <div className="image relative flex justify-center">
{
   imageUrl === "/" &&        <div className="img w-full h-[400px] bg-slate-400 rounded-xl"></div>
} 
       <img src={imageUrl} className={`w-full h-full object-contain ${imageUrl === "/" ? "absolute" : "relative"} left-0 top-0`} alt="" />
        <input type="file" onChange={(e) => {
          handleUpload(e)
        }} name="file" className='opacity-0 w-full h-full left-0 top-0 absolute z-9' id="file" />
{ imageUrl === "/" ? <span className='absolute font-semibold  text-5xl top-1/2 left-1/2 translate-[-50%]'>Banner</span> : null}
    </div>
    <div className="text py-10">
      <ShareContent.Provider value={[content,setContent]}>
      <Editor />
      </ShareContent.Provider>

    </div>


    <div className="tags my-3">
      <h1 className='font-semibold text-md mb-2'>Write Your Tags</h1>
      <Input type='text' placeholder='write tags' onChange={(e) => setTags(e.target.value)} />
    </div>

    <div className="actions my-6 flex gap-2">
      <Button onClick={() => {
        if (Title === "" || imageUrl === "/" || Object.keys(content).length === 0 || tags === "") {
          toast.error("Please fill all fields")
          return;
        } else {
                  CreatePost();
        }
      }}>Post</Button>
      <Button variant={"destructive"}>Cancel</Button>
    </div>
   

  </div>
  </div>
 </>
  )
}

export default page
