"use client"
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn } from 'lucide-react'
import api from '../../_api/axios';
import { toast, Toaster } from 'sonner'
import { Label } from '@/components/ui/label'
function User_join() {
    const [switcher , setSwitcher] = useState(false);

    
  return (
    <>
    {/* <Toaster position='top-right' /> */}
      {/* <DropdownMenu>
  <DropdownMenuTrigger>        <div className="img w-10 h-10 rounded-full bg-slate-100 "></div></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem >Login</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> */}
<Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='rounded-full' variant="outline"><LogIn /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
             {switcher?"Register" : "Login"} for get the comment the posts and get new extra posts
            </DialogDescription>
          </DialogHeader>
          <form action="/home" target='_blank' method='post' onSubmit={(e:any) => {e.preventDefault() 

        if (!switcher) {
                 api.post("/login" , {
                    email:e.target[0].value,
                    password:e.target[1].value,
                }).then(res => {
 localStorage.setItem("token" , res.headers["x-auth-header"])
         localStorage.setItem("userId" , res.data.id)
   setTimeout(() => {
          window.location.reload();
        }, 1000);
})
.catch(err => {
  toast.error("Login failed, please check your credentials." , {
    duration: 3000,});
});
        } else {
                 api.post("/register" , {
                    email:e.target[0].value,
                    password:e.target[2].value,
                    UserName:e.target[1].value,
                }).then(res => {
                     localStorage.setItem("token" , res.headers["x-auth-header"]);
console.log(res)
  setTimeout(() => {
          window.location.reload();
        }, 1000);
        localStorage.setItem("userId" , res.data.id)
                    })
.catch(err => {
  toast.error("Registration failed, please try again." , {
    duration: 3000,});
});
        }

      

            }}>
            <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue="" />
            </div>
           {switcher ? (
             <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" defaultValue="" />
            </div>
           ) : null}
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" defaultValue="" />
            </div>
          </div>
          <h2 className='my-2'><span>{switcher ? "Have an account?," : "New member?,"} <span className='text-gray-800 cursor-pointer hover:text-gray-600' onClick={() => {
            setSwitcher((s) => !s)
          }}>{switcher ? "Login Now" : "Join Now"}</span></span></h2>
          <DialogFooter >
  
              <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
           
           <div className="button relative">
             <Button onClick={() => {
            }} type="submit">{switcher?"Register" : "Login"}</Button>
            <input type='submit' className='absolute left-0 top-0 w-full h-full opacity-0' />
           </div>
          </DialogFooter>
                    </form>
        </DialogContent>
      </form>
    </Dialog>
  </>
  )
}

export default User_join
