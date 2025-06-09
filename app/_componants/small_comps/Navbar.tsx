"use client"
import { Search } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import User_join from './User_join'
import Link from 'next/link'
import Search_input from './Search_input'
import api from '@/app/_api/axios'
import Edit_profile from './Edit_profile'
function Navbar(props:{ShowingLogo?:boolean}) {

  const [TO , setTO]:any = useState("")
  const [UserName, setUserName] = useState("");
const [image, setImage] = useState("");
  // useEffect(() => {
  //   api.get(`/users/${localStorage.getItem("userId")}`, {
  //     headers: {  "x-auth-header": To }
  //   }).then((res) => {
  //     setUserName(res.data.UserName);
  //     setImage(res.data.image);
  //   }).catch((e) => {
  //     console.log("error => ", e);
  //   })

  //   setTO(window.localStorage.getItem("token"))
  // } , [])
  
  return (
 <div className="parent flex justify-center px-15 max-md:px-6 py-7 bg-white">
   <div className="container justify-between  items-center flex ">
    <div className="flex items-center gap-9">
         
  <Link href={"/"} className='flex items-center gap-2'>
  <Image src={"/Soblo-Photoroom.png"} className={`${props.ShowingLogo ? "hidden" : ""}`} width={100} height={10} alt='' />
  </Link>
  <Search_input />
    </div>
    <div className="account">
   
{TO === null ? (<User_join />) : (
         <DropdownMenu>
  <DropdownMenuTrigger>        <Image src={image} width={40} height={40} className="img w-10 h-10 rounded-full bg-slate-100 " alt={''} /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Hello {UserName}</DropdownMenuLabel>
    <DropdownMenuSeparator />
      <Edit_profile />
    <DropdownMenuItem onClick={() => {
           localStorage.removeItem("admin_sAs_admin");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                        }}>logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
)}
 
    </div>
   </div>
 </div>
  )
}

export default Navbar
