"use client"

import React, { useContext, useEffect, useRef } from 'react'
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { createReactEditorJS } from 'react-editor-js';
import EditorJS from '@editorjs/editorjs';
import { ShareContent } from '@/app/create_post/page';
import Image from '@editorjs/image'



function Editor_read({data , readOnly = false}:any) {

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
        data:data ? data : {},
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

export default Editor_read
