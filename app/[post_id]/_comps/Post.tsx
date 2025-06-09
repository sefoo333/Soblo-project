"use client"
import React, { useEffect, useState } from 'react'
import { Ellipsis, Eye, GitCommitVerticalIcon, Heart, MessageCircle, Share } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import api from '../../_api/axios'
import Editor_read from '../../_componants/small_comps/Editor_read'
import { ShareButton } from './Share'
import { comment, post } from '@/app/interfaces/user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {io} from 'socket.io-client';
import { toast, Toaster } from 'sonner'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import Loves from './Loves'
// const socket = io(`http://localhost:3001/api/posts/updatelikes`);
function Post({data}:post | any) {
    const [love,setLove] = useState(false)
    const [loves,setloves] = useState(0)
    const [content,setContent] = useState("")


    useEffect(() => {
        const Mydata = data.loves.find((e:any) => e.id === localStorage.getItem("userId"));
        if (Mydata) {
            setLove(true)
        }
    },[])


    const routes = useRouter()

    // errors when not logged in

    const [comment_log , setLog1] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("token")){
            setLog1(true)
        }

        
    },[])

    const DeleteComment = async (id:string , idComment:string | number) => {
        api.put(`/posts/deleteComment/${id}` , {commentId:idComment} , {headers:{"x-auth-header":localStorage.getItem("token")}}).then(() => {
            toast.success("Comment Deleted Successfully")
        }).catch((e) => {
            console.log("error => " , e)
            toast.error("Error Deleting Comment")
        }
        )
        routes.refresh()
    }

  return (
    <>
    <Toaster />
     <div className="parent w-full flex justify-center max-md:px-5 " style={{scrollBehavior:"smooth"}}>
<div className="container  w-[48rem] py-10">
    <div className="header my-4 mb-10">
        <h1 className='font-bold text-6xl max-md:text-2xl'>{data.PostName}</h1>
        {/* <p className='text-3xl font-medium text-[#595959] mt-1'>test test test af is my test</p> */}
       <div className="flex-row my-7 flex gap-2">
         <div className="account flex gap-2 items-center">
            <Image src={"https://res.cloudinary.com/dj2rasyos/image/upload/v1749388520/ai53uozmgqm739r4mq83.jpg"} width={30} height={30} alt='' className="img w-6 h-6 rounded-full bg-slate-300" />
            <h1>Seifeldeen Ali</h1>
            
        </div>
        <span>- {data?.Date?.slice(0,10).split("-").join("/")}</span>
       </div>
          <div className="react flex justify-between text-[#595959] py-3 border-y border-y-[#dddcdc]">
            <div className="icons flex gap-6 text-[#595959] ">
                <div className="views flex gap-2 text-[15px] items-center">
<Eye size={22} />
<span>{data.view}</span>
                </div>
                <Loves data={data.loves} id={data._id} />
                <div className="comments flex gap-2 text-[15px] items-center" >
                    <MessageCircle  size={22} />
                    <span>{data.comments.length}</span>
                </div>
            </div>
             <div className="share cursor-pointer">
<ShareButton />
            </div>
          </div>
    </div>
    <div className="image flex justify-center">
        {/* <div className="img w-full h-[400px] bg-slate-400 rounded-xl"></div> */}
        {data.Banner ? (
            <Image src={data?.Banner ? data?.Banner : "/"} alt="post image" width={1000} height={400} className='w-full h-[400px] rounded-xl object-cover' />
        ) : null }
    </div>
    <div className="text py-10">
        
        <Editor_read readOnly={true} data={data.content} />
    </div>
    <div className="tags">
         <div className="tags my-6 flex gap-2 max-md:grid max-md:grid-cols-3 max-md:w-fit">
                {data.tags.map((e:string,a:number) => (
                <Badge key={a} variant={'outline'} className='text-md bg-gray-500 max-md:w-full text-white rounded-full px-3 py-1'>{e}</Badge>
                ))}
            </div>

             <div className="react flex justify-between text-[#595959] py-5 border-y border-y-[#dddcdc]">
            <div className="icons flex gap-6 text-[#595959] ">
                <div className="views flex gap-2 text-[15px] items-center">
<Eye size={22} />
<span>{data.view}</span>
                </div>
                               <Loves data={data.loves} id={data._id} />
                <div className="comments flex gap-2 text-[15px] items-center">
                    <MessageCircle  size={22} />
                    <span>{data.comments.length}</span>
                </div>
            </div>
            <div className="share cursor-pointer">
<ShareButton />
            </div>
          </div>

</div>
<div className="comments">
    <h1 className='text-3xl font-semibold mt-5'>({data.comments.length}) Comments</h1>
    {comment_log ? (
        <div className="write flex gap-6 my-10">
        <Input type='text' onChange={(e) => setContent(e.target.value)} placeholder='write Your Comment' className='p-5 font-semibold' />
        <Button className='p-5' onClick={() => {
            const newComment = {
                token:localStorage.getItem("token"),
                commentContent:content,
                commentDate:new Date(),
            }
            api.put("/posts/comments" , {id:data._id , comments:newComment} , {headers:{"x-auth-header":localStorage.getItem("token")}})
                    routes.refresh()

        }}>Send</Button>
    </div>
    ) : null}
    <div className="comments py-7 pt-3">
     
    {data.comments.map((e:comment , a:number) => (
         <div key={a} className="comment py-5 border-b border-b-[#dddcdc]">
            <div className="flex justify-between">
                 <div className="account flex gap-2 items-center pb-4">
            <Image src={e.PhotoUrl !== "" ? e?.PhotoUrl : "/"} className="img w-10 h-10 rounded-full bg-slate-300" width={40} height={40} alt='' />
            <div className="text">
                <h1 className='text-md mb-[-5px]'>{e.commentName}</h1>
                <span className='text-[13px] text-gray-600'>{e.commentDate.slice(0,10).split("-").join("/")}</span>
            </div>
            
        </div>
      {localStorage.getItem("admin_sAs_admin") ? (
          <div className="more">
                  <DropdownMenu>
  <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Comment Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => DeleteComment(data._id , e?.idComment)} className='text-red-500'>Delete Comment</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                 </div>
      ) : localStorage.getItem("userId") === e.idUser ? (
        <div className="more">
                  <DropdownMenu>
  <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Comment Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => DeleteComment(data._id , e?.idComment)} className='text-red-500'>Delete Comment</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                 </div>

      ) : null}
            </div>
        <p style={{lineBreak:"anywhere"}}>
          {e.commentContent}

        </p>
        </div>
    ))}
    </div>
</div>
  </div>
  </div>
  </>
  )
}

export default Post
