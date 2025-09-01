"use client"

import api from '@/app/_api/axios'
import { Languages } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

function TranslateButton({id , arabic,setArabic}:{id:string,arabic?:string,setArabic:any}) {


    const SwithcToAny = () => {
        api.get("posts/"+id).then((e) => {
if (e.data.language){
    setArabic((e) => !e)
   if(arabic){
     toast.success("Translate To English 🌎")
   }else{
     toast.success("Translate To Arabic 🕋")
   }
}else {
    toast.error("post is not have a translate")
}
        }).catch((err) => {
            toast.error("Oops , something went error !")
        })
    }

  return (
    <Languages onClick={SwithcToAny} />
  )
}

export default TranslateButton