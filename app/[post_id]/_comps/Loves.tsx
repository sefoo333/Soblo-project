"use client"

import { useState } from 'react'
import { toast } from 'sonner'
import api from '@/app/_api/axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
    DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from 'lucide-react'
import { users } from '@/app/interfaces/user'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


function Loves({data , id}: {data:any , id:string}) {
    const [love, setLove] = useState(false)
    const [show, setShow] = useState(false)
    const routes = useRouter()
    
      useEffect(() => {
            const Mydata = data.find((e:any) => e.id === localStorage.getItem("userId"));
            if (Mydata) {
                setLove(true)
            }
        },[])
    

  return (

    <div className='relative flex items-center gap-2' onMouseMove={() => {setShow((r) => true)}} onMouseLeave={() => {setTimeout(() => {setShow((r) => false)} , 1000)}}>
         <div className="views relative flex gap-2 text-[15px] items-center cursor-pointer"   onClick={() => {
                    setLove((l) => !l)
                    if (!love){
                        api.put("/posts/updatelikes" , {id:id , loves:localStorage.getItem("token")} , {headers:{"x-auth-header":localStorage.getItem("token")}}).then((r) => routes.refresh()).catch((err) => {
                            console.log("error => ", err)
                            toast("you must logIn to like the post")
                        })
                    } else {
                                                api.put("/posts/updateRemovelikes" , {id:id , loves:localStorage.getItem("token")} , {headers:{"x-auth-header":localStorage.getItem("token")}}).then((r) => routes.refresh()).catch((err) => toast("you must logIn to comment the post"))
                    }
                }}>
                    <Heart color={`${love ? "red" : "black"}`} size={22} />
                    <span>{data.length}</span>
                </div>
             {show ? (
                <div className="window bg-white absolute top-full left-0 w-[200px] px-5 py-2 mt-2 rounded-md border border-[#e2dfdf]" onMouseMove={() => {setShow((r) => true)}}>
                {data.map((e:{UserName:string,image:string}) => (
              <div  className="student flex justify-between  py-2 items-center border-b border-b-[#cccccc5d]">
                    <div className="so flex gap-4 items-center">
               <Image src={e?.image} className="img w-6 h-6 rounded-full bg-slate-300" width={40} height={40} alt='' />
                     <div className="text">
                       <h1 className='font-semibold text-md'>{e.UserName}</h1>
                       <h1 className='text-sm'>User</h1>
                     </div>
                    </div>
                    
                    </div>
        ))}
                </div>
             ) : null}
    </div>
    //         <Button type="button" variant="secondary">
    //           Close
    //         </Button>
  )
}

export default Loves
