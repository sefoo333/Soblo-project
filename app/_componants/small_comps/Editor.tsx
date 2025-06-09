"use client"

import React, { useContext, useEffect, useRef } from 'react'
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { createReactEditorJS } from 'react-editor-js';
import EditorJS from '@editorjs/editorjs';
import { ShareContent } from '@/app/create_post/page';
import Image from '@editorjs/image'
import Code from '@editorjs/code'
import Table from '@editorjs/table'



function Editor({onSave}:any) {
  const [share , setShare]:any = useContext(ShareContent);

  const editorRef = useRef<EditorJS | null | any>(null);
        const ReactEditorJS = createReactEditorJS();
    const EDITOR_JS_TOOLS = {
      header: Header,
      list: List,
      image:Image
    };

 useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header:Header,
          list: List,
          code: Code,
          table: Table,
          image:{
            class:Image,
            config: {
              uploader: {
                uploadByFile(file:string | Blob) {
                  return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'sobloo'); // Replace with your Cloudinary preset

                    fetch(`https://api.cloudinary.com/v1_1/dj2rasyos/image/upload`, {
                      method: 'POST',
                      body: formData,
                    })
                      .then(response => response.json())
                      .then(data => {
                        resolve({
                          success: 1,
                          file: {
                            url: data.secure_url,
                          },
                        });
                      })
                      .catch(error => {
                        reject(error);
                      });
                  });
                },
              },
            }
          }
        },
        autofocus: true,
        onReady: () => {
          console.log('Editor.js is ready to use!');
        },
        onChange: async () => {
            const outputData = await editorRef.current.save();
    console.log(outputData)
    setShare(outputData); // Pass data to parent or send directly here
        }
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

         <div className=' p-10'>
    <div id={"editorjs"}   />
      {/* <button onClick={handleSave}>حفظ المحتوى</button> */}
    </div>
      
    </div>
  )
}

export default Editor
