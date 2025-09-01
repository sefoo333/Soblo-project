"use client";
import Navbar from '@/app/_componants/small_comps/Navbar';
import React from 'react'
import { useState , useEffect } from 'react'
import {Eye, Frown, Heart, Meh} from "lucide-react"
import { Badge } from '@/components/ui/badge'
import api from '@/app/_api/axios'
import {post} from "../../interfaces/user"
import Link from 'next/link'
import Sidebar_home from '@/app/_componants/small_comps/Sidebar_home';
import Image from 'next/image';
import { useParams } from 'next/navigation';
function page() {



    const [data,setData] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log("error => " , e)
    })

        
    
  } ,[])


  const params:any = useParams();

  return (

    
   
   <>
   <Navbar />
  <div className="parent w-full flex max-md:px-[20px] justify-center">
<div className="container  w-[80rem] py-10">
      <div className="window flex gap-9">
         <div className="t basis-[70%] max-md:basis-full">
         <h1 className='text-4xl font-bold pb-6'>{params.tags_id}</h1>
        <div className="posts">
             <div className="posts basis-[70%] flex flex-col gap-10">
      

      {data.filter((e:post) => e.tags.includes(`${params.tags_id} `)).length > 0 ?(
        <>
          {data.filter((e:post) => e.tags.includes(`${params.tags_id} `)).map((e:post) => (
          <Link href={`/${e._id}`} onClick={() => {
            console.log("er")
            api.put("/posts/updateViews",{view:e.view+1 , id:e._id} , {headers:{"x-auth-header":localStorage.getItem("token")}}).then((e) => console.log("success")).catch((err) => console.log("ee",err))
          }}>
             <div id={e._id} className="post flex justify-between bg-white border border-[#e2dfdf] p-5 rounded-md max-xl:flex-col max-xl:gap-5">
          <div className="text">
             <div className="main mb-3">
             <span className='font-medium text-[13px] text-[#595959] mb-3'>21 Mars</span>
            <h1 className='font-bold text-3xl'>{e.PostName}</h1>
            <p className='text-md text-[#616161] mt-0.5'>post is my post because this is my post :)</p>
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
                {e?.tags?.map((a) => (
                                  <Badge variant={'outline'}>{a}</Badge>
                ))}
            </div>
          </div>
          <div className="image">
              <Image src={e.Banner} width={300} height={150} alt='' className="img w-[300px] max-xl:w-full h-[150px] object-cover bg-slate-300 rounded-md" />
          </div>
        </div>
          </Link>
        ))}
        </>
      ) : (
        <div className="not_found text-center flex relative flex-col items-center justify-center h-[50vh]">
          <Meh size={100} className='text-[#ccc]' />
          {/* <h1 className='font-bold text-4xl'>400</h1> */}
          <h1 className='font-semibold text-2xl'>No results here</h1>
        </div>
      )}

    </div>
        </div>
       </div>
       <Sidebar_home filter={data} />
      </div>
  </div>    
   </div>
   </>
  )
}

export default page
