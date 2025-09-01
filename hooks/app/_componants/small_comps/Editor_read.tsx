"use client"

import React, { useContext, useEffect, useRef } from 'react'
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { createReactEditorJS } from 'react-editor-js';
import EditorJS from '@editorjs/editorjs';
import Image from '@editorjs/image'
import { Tajawal } from 'next/font/google';



function Editor_read({data , readOnly = false , language , data_arabic}:any) {

  const editorRef:any = useRef(null)
 useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          image:Image,
        },
        data:language ? data_arabic : data,
        autofocus: true,
        readOnly,
        onReady: () => {
          console.log('Editor.js is ready to use!');
        },
      });
    }

      return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    },[])



  return (
    <div>

         <div className=' p-10 max-md:p-2'>
    <div id={"editorjs"}   />
    </div>
      
    </div>
  )
}


const geistMono = Tajawal({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight:["200","300" ,"400","500","700" ,"800" ,"900"]
});

function Editor_read2({data , readOnly = false , language , data_arabic}:any) {

  const editorRef:any = useRef(null)
 useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          image:Image,
        },
        data:data_arabic,
        autofocus: true,
        readOnly,
        onReady: () => {
          console.log('Editor.js is ready to use!');
        },
      });
    }

      return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    },[])



  return (
    <div>

         <div className={` ltr p-10 max-md:p-2 ${geistMono.className}`} dir='rtl'>
    <div id={"editorjs"}   />
    </div>
      
    </div>
  )
}

export {Editor_read,Editor_read2}
