"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Ellipsis, Search, UserRoundPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import api from '@/app/_api/axios'
import axios from 'axios'
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
import { toast, Toaster } from 'sonner'
import Image from 'next/image'

interface users {
  UserName:string,
  email:string,
  _id:string,
  isAdmin:boolean,
  image:string,
}

function Users() {
const [data,setData] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log("error => " , e)
    })
  } ,[])


  const deleteUser = async (id:string) => {
      api.delete(`/users/DeleteSTD/${id}`,{
        headers:{
          "x-auth-header":localStorage.getItem("token")
        }
      }).then(() => {
        console.log("success")
      }).catch((e) => {
        console.log("error => " + e)
      })


  }

  const [serchData ,setSearch] = useState([]);


  const searchUser = (id:string) => {
      api.get(`/users/userNames/${id}`,{
        headers:{
          "x-auth-header":localStorage.getItem("token")
        }
      }).then((e) => {
        setSearch(e.data)
        console.log(serchData)
      }).catch((e) => {
        console.log("error => " + e)
      })
  }

  const AddUser = async (e:React.FormEvent | {target:any}) => {
   try{
   await api.post("/users/Addstudent" , {
      UserName:e.target[0].value,
      email:e.target[1].value,
      password:e.target[2].value,
    } , {
      headers:{
        "x-auth-header":localStorage.getItem("token")
      }
    })
   } catch(e) {
    console.log("error" , e)
   }
  }


  const makeItAdmin = async (id:string) => {
    try {
      await api.put(`/users/makeAdmin/${id}`, {}, {
        headers:{
          "x-auth-header":localStorage.getItem("token")
        }
      })
    } catch (e) {
      console.log("error => " + e) 
    }
  }
  const RemoveAdmin = async (id:string) => {
    try {
      await api.put(`/users/removeAdmin/${id}`, {}, {
        headers:{
          "x-auth-header":localStorage.getItem("token")
        }
      })
    } catch (e) {
      console.log("error => " + e) 
    }
  }

  return (
    <>
    <Toaster />
      <div className="window w-full py-10 px-8">
        <h1 className='text-4xl font-bold pb-6'>Users</h1>
          <div className="last_logins py-5 px-9  border border-[#ccc] bg-white mt-10 rounded-md">
<div className="flex justify-between items-center">
          <h1 className='font-semibold'>Last Logins</h1>
         <div>
              <Dialog>
      <form>
        <DialogTrigger >
<UserRoundPlus cursor={"pointer"} />  </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <form action="" onSubmit={(e) => {
            e.preventDefault()

            AddUser(e)
          }}>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name-1">UserName</label>
              <Input id="name-1" name="username"  />
            </div>
            <div className="grid gap-3">
              <label htmlFor="email-1">Email</label>
              <Input id="email-1" name="email"  />
            </div>
            <div className="grid gap-3">
              <label htmlFor="password-1">Password</label>
              <Input id="password-1" name="password"  />
            </div>
          </div>
          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
               <div className="button relative">
                         <Button onClick={() => {
                        }} type="submit">Add User</Button>
                        <input type='submit' className='absolute left-0 top-0 w-full h-full opacity-0' />
                       </div>
          </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
         </div>

</div>
        <div className="students">
               
                
               {serchData.length === 0 ? (
                <>
                 {data.map((e:users) => (
                   <div id={e._id} className="student flex justify-between  py-5 items-center border-b border-b-[#ccc]">
                 <div className="so flex gap-4">
              <Image src={e.image} width={300} height={150} alt='' className="img rounded-full w-10 h-10 max-md:w-full object-cover bg-slate-300 " />
                  <div className="text">
                    <h1 className='font-semibold text-md'>{e.UserName} {e.isAdmin ? "- Admin" : ""}</h1>
                    <h1 className='text-sm'>{e.email}</h1>
                  </div>
                 </div>
                 <div className="more">
                  <DropdownMenu>
  <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => deleteUser(e._id)} className='text-red-500'>Delete</DropdownMenuItem>
   {!e.isAdmin ? (
     <DropdownMenuItem onClick={() => {
      toast.success("User made admin successfully", {
duration: 3000,})
makeItAdmin(e._id)
    }}>Make Admin</DropdownMenuItem>
   ) : (
     <DropdownMenuItem onClick={() => {
      toast.success("Admin Roles succes removed", {
duration: 3000,})
RemoveAdmin(e._id)
    }}>Remove Admin</DropdownMenuItem>
   )}
  </DropdownMenuContent>
</DropdownMenu>
                 </div>
                 </div>
                ))}
                </>
               ) : 
               (
                <>
                 {serchData.map((e:users) => (
                   <div id={e._id} className="student flex justify-between  py-5 items-center border-b border-b-[#ccc]">
                 <div className="so flex gap-4">
              <Image src={e.image} width={300} height={150} alt='' className="img rounded-full w-10 h-10 max-md:w-full object-cover bg-slate-300" />
                  <div className="text">
                    <h1 className='font-semibold text-md'>{e.UserName} {e.isAdmin ? "- Admin" : ""}</h1>
                    <h1 className='text-sm'>{e.email}</h1>
                  </div>
                 </div>
                 <div className="more">
                  <DropdownMenu>
  <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => deleteUser(e._id)} className='text-red-500'>Delete</DropdownMenuItem>
    <DropdownMenuItem>Make Admin</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                 </div>
                 </div>
                ))}
                </>
               )}
               
        </div>
    <div className="flex flex-row-reverse pt-4">
         <div className="search relative">
      <Input onChange={(e) => searchUser(e.target.value)} type='text' className='pl-8 py-5 w-[280px]' placeholder='search For users' />
      <Search className='absolute top-1/2 translate-[-50%] left-4' size={16} />
  </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default Users
