import React, { cache } from 'react'
import Navbar from '../_componants/small_comps/Navbar'
import { Eye, GitCommitVerticalIcon, Heart, MessageCircle, Share } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import api from '../_api/axios'
import { post } from '../interfaces/user'
import Editor from '../_componants/small_comps/Editor'
import Editor_read from '../_componants/small_comps/Editor_read'
import Post from './_comps/Post'

async function page({params}:any) {


  
     let data;
     try {
         data = await (await api.get(`/posts/${params.post_id}`)).data
     } catch(error){
        console.error("Error fetching post data:", error);
        data = { PostName: "Post not found", content: "This post does not exist or has been deleted." };
     }
    return (
 <>
 <Navbar />
  <Post data={data} />
 </>
  )
}

export default page



 {/* <div>
            <h3 className='font-bold text-2xl my-5'>Introduction</h3>
            <p>
                Programming is no longer just a niche skill reserved for computer scientists and tech geeks. In today’s world, it’s a powerful tool that enables creativity, problem-solving, and innovation. Whether you're developing a mobile app, automating tasks, or building a robot, programming is the backbone of modern technology.
            </p>
            <h3 className='font-bold text-2xl my-5'>
                What is Programming?
            </h3>
            <div>
<p>
                    At its core, programming is the process of writing instructions that a computer can understand and execute. These instructions are written in programming languages like:
</p>
                <ul className='mt-3'>
                    <li><span className='font-semibold'>python</span> - great for beginners and used in data science, web development, and automation.</li>
                    <li><span className='font-semibold'>python</span> - great for beginners and used in data science, web development, and automation.</li>
                    <li><span className='font-semibold'>python</span> - great for beginners and used in data science, web development, and automation.</li>
                    <li><span className='font-semibold'>python</span> - great for beginners and used in data science, web development, and automation.</li>
                </ul>
            </div>
        </div>*/}