"use client"
import api from '@/app/_api/axios';
import React, { useEffect, useState } from 'react'
import {users} from "../../interfaces/user"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Last_logins() {

  const [data,setData] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log("error => " , e)
    })
  } ,[])


  return (
      <div className="last_logins
       py-5 px-9 h-full  border border-[#ccc] bg-white mt-10 rounded-md">
        <h1 className='font-semibold'>Last Logins</h1>
        <div className="students">
                {data.slice(0,5).map((e:users) => (
                 <div className="student flex gap-4 py-5 items-center border-b border-b-[#ccc]">
                   <div className="img w-10 h-10 rounded-full bg-slate-100 "></div>
                  <div className="text">
                    <h1 className='font-semibold text-md'>{e.UserName}</h1>
                    <h1 className='text-sm'>{e.email}</h1>
                  </div>
                 </div>

                ))}
               
        </div>
       <div className="button text-end mt-5">
         <Button variant="outline"><Link href={"/admin/users"}>View more</Link></Button>
       </div>
      </div>
  )
}

export default Last_logins
