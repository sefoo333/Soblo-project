"use client"
import { useState , useEffect } from 'react'
import React from 'react'
import { Toaster } from 'sonner'
import {BadgeCheckIcon, Eye, Github, Heart, Linkedin, Youtube} from "lucide-react"
import { Badge } from '@/components/ui/badge'
import api from '@/app/_api/axios'
import {post} from "../../interfaces/user"
import Link from 'next/link'
import Image from 'next/image'
function Home_comp() {
  const [data,setData] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log("error => " , e)
    })

        
    
  } ,[])

   const tags = [
        {
            name: 'Comic',
            href: '/comic',
        },
        {
            name: 'Adventure',
            href: '/adventure',},
        {
            name: 'Romance',
            href: '/romance',},
        {
            name: 'Programming',
            href: '/programming',
        },
        {
            name: 'Food',
            href: '/food',
        }
    ]

        



  return (
    <>
            <Toaster />
  <div className="window flex gap-9">
    {/* <h1 className='font-bold text-4xl'>Courses</h1>
    <div className="courses mt-10 grid gap-7 w-full grid-cols-3">
        <Course_card />
        <Course_card />
        <Course_card />
    </div> */}
    <div className="posts basis-[70%] max-md:basis-full flex flex-col gap-7">
      

        {data.map((e:post) => (
          <Link href={`/${e._id}`} key={e._id} onClick={() => {
            api.put("/posts/updateViews",{view:e.view+1 , id:e._id} , {headers:{"x-auth-header":localStorage.getItem("token")}}).then((e) => console.log("success")).catch((err) => console.log("ee",err))
          }}>
             <div id={e._id} className="post flex justify-between bg-white border border-[#e2dfdf] p-5 rounded-md max-xl:flex-col  max-xl:gap-5">
          <div className="text">
             <div className="main mb-3">
             <span className='font-medium text-[13px] text-[#595959] mb-3'>{e.Date.toString().slice(0,10)}</span>
            <h1 className='font-bold text-3xl'>{e.PostName}</h1>
            {/* <p className='text-md text-[#616161] mt-0.5'>post is my post because this is my post :)</p> */}
           </div>
             <div className="icons flex gap-4 text-[#595959] my-3">
                <div className="views flex gap-2 text-[15px] items-center">
<Eye size={16} />
<span>{e.view}</span>
                </div>
                <div className="views flex gap-2 text-[15px] items-center">
                    <Heart  size={16} />
                    <span>{e.loves.length}</span>
                </div>
            </div>
            <div className="tags flex gap-2">
                {e?.tags?.map((a,b) => (
                                  <Badge key={b} variant={'outline'}>{a}</Badge>
                ))}
            </div>
          </div>
          <div className="image">
              <Image src={e.Banner} width={300} height={150} alt='' className="img w-[300px] h-[150px] max-xl:w-full object-cover bg-slate-300 rounded-md" />
          </div>
        </div>
          </Link>
        ))}

    </div>
    <div className="sidebar basis-[30%] sticky bg-white p-10 rounded-md border border-[#e2dfdf] max-md:hidden">
        <h1 className='text-xl font-semibold'>Trending News</h1>
        <div className="news flex flex-col gap-9 mt-7">
          <>
          {data.sort((a:{view:number},b:{view:number}) => b.view - a.view).slice(0,3).map((e:post) => (
         <div className="new" key={e._id}>
            <Link href={`/${e._id}`}  >
              <div className="cube w-2 h-2 bg-red-500 mb-1"></div>
              <h1 className='font-bold text-[18px] mb-1'>{e.PostName}</h1>
           <div className="two flex justify-between">
             <span className='text-gray-500 text-sm'>{e.Date.toString().slice(0,10)}</span>
             <span className='text-gray-500 text-sm'>{e.writer}</span>
           </div>
              </Link>
          </div>
          ))}
        
          </>
         
        </div>
             <div className="topics mt-6">
                 <h1 className='text-xl font-semibold'>Topics</h1>
                 <div className="topics mt-4">
              {tags.map((tag, index) => (
                    <Badge key={index} variant={'outline'} className='text-sm bg-gray-500 text-white rounded-full px-3 py-1 m-0.5'>
                       <Link href={`tags/${tag.href}`} className='text-white transition hover:text-gray-300'>
                        {tag.name}
                        </Link>
                    </Badge>
                ))}
                 </div>
             </div>
             <div className="follow mt-6">
              <h1 className='text-xl font-semibold'>Follow Me</h1>
               <div className="badges  flex gap-2 mt-2">
                              <a href="https://github.com/sefoo333" target="_blank">
                               <Badge
                        variant="secondary"
                        className="bg-black text-sm text-white rounded-full dark:bg-black"
                      >
                        <Github size={23} />
                        Github
                      </Badge>
                        </a>
                      <a href="https://www.linkedin.com/in/sefoo333/" target='_blank'>
                               <Badge
                        variant="secondary"
                        className="bg-blue-500 text-sm text-white rounded-full dark:bg-blue-600"
                      >
                        <Linkedin  size={23}  />
                        LinkedIn
                      </Badge>
                       </a>
                      <a href="https://www.youtube.com/@seif333" target="_blank" className='flex items-center gap-2'>
                               <Badge
                        variant="secondary"
                        className="bg-red-400 text-sm text-white rounded-full dark:bg-red-500"
                      >
                        <Youtube  size={23}  />
                        Youtube
                      </Badge>
                        </a>
                            </div>
             </div>
    </div>
  </div>
    </>
  )
}

export default Home_comp
