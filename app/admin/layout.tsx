"use client"

import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import { Sidebaer } from '../_componants/small_comps/Sidebar'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import api from '../_api/axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function layout({children}:any) {

  const [getAdmin,setTo]:any = useState("")
  useEffect(() => {
    setTo(localStorage.getItem("admin_sAs_admin"))
  },[])        
  
  const routes = useRouter();

  const Auth  =  (e:React.FormEvent | any) => {
     api.post("/admin_login", {
email: e.target[0].value,
password: e.target[1].value,
    }).then((res) => {
      localStorage.setItem("admin_sAs_admin" , res.headers["x-auth-header"])
      localStorage.setItem("token" , res.headers["x-auth-header"])
      localStorage.setItem("userId" , res.data.id)
      toast.success("Welcome to Admin Panel")
      routes.replace("/admin/home")
          routes.refresh()
          
    }).catch((err) => {
// routes.push("/")
console.log("error => ", err)
console.log(e.target[0].value, e.target[1].value)
    })
  }


  return (
   <div className={`flex ${getAdmin ? "w-full" : "w-full h-screen items-center justify-center"}`}>
       {getAdmin !== null && getAdmin !== "" ? (
     <div className="sidebar relative">
         <SidebarProvider>
      <Sidebaer />
      </SidebarProvider>
     </div>
       ) : null}
      
     {getAdmin !== null && getAdmin !== "" ? (
       <>
       {children}
       </>
     ) : (
      <div className="login p-[30px] bg-white w-[400px] h-[25rem] rounded-xl shadow-md flex flex-col items-center justify-center">
       <Image src={"/Soblo-Photoroom.png"} width={300} height={300} alt='logo' className='mx-auto w-[130px]' />
       <div className="form w-full mt-5">
        <h1 className='font-semibold text-center'>Login to join Admin Panel</h1>
        <form method='post' className='flex flex-col gap-5 mt-5' onSubmit={(e) => {
          e.preventDefault();
          Auth(e);
        }}>
          <Input type="text" name='email' placeholder='email' className='border border-[#e2dfdf] rounded-md p-3 outline-none focus:border-[#000]' />
          <Input type="password" name='password' placeholder='Password' className='border border-[#e2dfdf] rounded-md p-3 outline-none focus:border-[#000]' />
          <Button type='submit' className='bg-[#000] text-white py-3 rounded-md'>Login</Button>
          </form>
       </div>
      </div>
     )}
    </div>
  )
}

export default layout
