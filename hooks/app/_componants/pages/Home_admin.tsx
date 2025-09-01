"use client"
import { useEffect, useState } from 'react'
import api from '@/app/_api/axios'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Eye, Heart, LassoSelect } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ChartAreaDefault } from '../small_comps/chart'
import Counters from '../home_admin_comps/Counters'
import Last_logins from '../home_admin_comps/last_logins'
import { post } from '@/app/interfaces/user'
import Image from 'next/image'
import Link from 'next/link'

function Home_admin() {


   const [data,setData] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log("error => " , e)
    })

        
    
  } ,[])

  return (
 <div className="window w-full py-10 px-8">
        <h1 className='text-4xl font-bold pb-6'>Home</h1>
   <div className="flex w-full gap-15 justify-between">
     <div className="flex flex-col basis-1/2">
<Counters />
  <Last_logins />
    </div>

      <div className="course-panel h-full basis-[40%] py-5 px-9  border border-[#ccc] bg-white  rounded-md">
        <h1 className='font-semibold mb-4'>posts</h1>
      <div className="courses grid grid-cols-1 gap-7">
    
        <>
     {data.slice(0,3).map((e:post) => (
         <Link href={`/${e._id}`}>
<div className="post flex justify-between bg-white border border-[#e2dfdf] p-5 rounded-md">
          <div className="text">
             <div className="main mb-3">
             <span className='font-medium text-[13px] text-[#595959] mb-3'>21 Mars</span>
            <h1 className='font-bold text-2xl w-full'>{e.PostName}</h1>
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
                {e.tags.map((tag: string, index: number) => (
<Badge key={index} variant={'outline'}>{tag}</Badge>
                ))}
            </div>
          </div>
           <div className="image">
            <Image src={e.Banner} alt='' width={200} height={200} className="img w-[200px] object-cover h-40 bg-slate-300 rounded-md" />
          </div> 
        </div>
          </Link>
     ))}
      </>
      </div>
    </div>
   </div>
  
  <div className="two grid grid-cols-2 mt-9">
    <div className="chart">
        <ChartAreaDefault />
    </div>
  </div>
  
      </div>
  )
}

export default Home_admin
