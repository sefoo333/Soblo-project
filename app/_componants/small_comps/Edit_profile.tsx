import React, { useEffect, useState } from 'react'
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
import { Label } from "@/components/ui/label"
import { Share } from "lucide-react"
import { toast } from 'sonner'
import api from '@/app/_api/axios'
import Image from 'next/image'

function Edit_profile() {

    const [imageUrl, setImageUrl] = useState("/");


    
  useEffect(() => {
    api.get(`/users/${localStorage.getItem("userId")}`, {
      headers: {  "x-auth-header": localStorage.getItem("token") }
    }).then((res) => {
      setImageUrl(res.data.image);
    }).catch((e) => {
      console.log("error => ", e);
    })
  } , [])


    const EditAccount = async (e:any) => {
      e.preventDefault();
      try {
        const response = await api.put(`/users/editProfile/${localStorage.getItem("userId")}`, {
            UserName:e.target[0].value,
            image:imageUrl,
        }, {
          headers: {
            "x-auth-header": localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    }

    const handleUpload = async (event:any) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData:any = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sobloo");
    
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dj2rasyos/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
    
        const data = await response.json();
        setImageUrl(data.secure_url);
       
      }

  return (
<Dialog>
      <DialogTrigger asChild>
<span className='w-full block p-[5px] text-sm'>Settings</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          {/* <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}
        </DialogHeader>
        <form method='post' onSubmit={(e) => {
            e.preventDefault();
            EditAccount(e as React.FormEvent<HTMLFormElement>);
        }} className="flex items-center gap-5 flex-col">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="userName" className="w-full">
              UserName
            </Label>
            <Input
              id="userName"
              defaultValue={``}
            />
            
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Image src={imageUrl} width={100} height={100} className="w-24 h-24 rounded-full" alt="Profile Image" />
      <Label htmlFor="picture">Image</Label>
      <Input id="picture" type="file" onChange={(e) => handleUpload(e)} />
    </div>
        <DialogFooter className="sm:justify-start" style={{flexDirection:"row"}}>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
            <Button type="submit">
              Save
            </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Edit_profile
