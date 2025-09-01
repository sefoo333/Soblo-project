"use client"
import Header from '@editorjs/header';
import List from '@editorjs/list';
import EditorJS from '@editorjs/editorjs';
import Image from '@editorjs/image'
import Code from '@editorjs/code'
import Table from '@editorjs/table'

export const tools = {
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
        }