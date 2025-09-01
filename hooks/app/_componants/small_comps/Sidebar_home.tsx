import { post } from '@/app/interfaces/user'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Sidebar_home({filter}: { filter: post[] }) {


    const tags = [
        {
            name: 'Comic',
            href: 'comic',
        },
        {
            name: 'Adventure',
            href: 'adventure',},
        {
            name: 'Romance',
            href: 'romance',},
        {
            name: 'Programming',
            href: 'programming',
        },
        {
            name: 'Food',
            href: 'food',
        }
    ]

  return (
 <div className="sidebar basis-[30%] sticky bg-white p-10 rounded-md border border-[#e2dfdf] max-md:hidden">
        <h1 className='text-xl font-semibold'>Trending News</h1>
        <div className="news flex flex-col gap-9 mt-7">
          <>
          {filter.slice(0,3).map((e:post) => (
         <div className="new">
            <Link href={`/${e._id}`}>
            <div className="cube w-2 h-2 bg-red-500 mb-1"></div>
              <h1 className='font-bold text-[18px] mb-1'>{e.PostName}</h1>
           <div className="two flex justify-between">
             <span className='text-gray-500 text-sm'>21 Mars</span>
             <span className='text-gray-500 text-sm'>{e.writer}</span>
           </div>
            </Link>
          </div>
          ))}
        
          </>
         
        </div>
             <div className="topics mt-6">
                 <h1 className='text-xl font-semibold'>Topics</h1>
                 <div className="topics mt-4">
                    {/* {filter.map((e: post) => e.tags).join(", ").split(", ").slice(0,6).map((tag: string, index: number) => (
                    <Badge key={index} variant={'outline'} className='text-sm bg-gray-500 text-white rounded-full px-3 py-1 m-0.5'>{tag}</Badge>
                    ))} */}
                {tags.map((tag, index) => (
                    <Badge key={index} variant={'outline'} className='text-sm bg-gray-500 text-white rounded-full px-3 py-1 m-0.5'>
                       <Link href={`${tag.href}`} className='text-white transition hover:text-gray-300'>
                        {tag.name}
                        </Link>
                    </Badge>
                ))}
                
                 </div>
             </div>
             <div className="follow mt-6">
              <h1 className='text-xl font-semibold'>Follow Me</h1>
              <div className="badges  flex gap-2 mt-2">
                <a href="https://github.com/sefoo333" target="_blank">
                 <Badge
          variant="secondary"
          className="bg-black text-sm text-white rounded-full dark:bg-black"
        >
          <Github size={23} />
          Github
        </Badge>
          </a>
        <a href="https://www.linkedin.com/in/sefoo333/" target='_blank'>
                 <Badge
          variant="secondary"
          className="bg-blue-500 text-sm text-white rounded-full dark:bg-blue-600"
        >
          <Linkedin  size={23}  />
          LinkedIn
        </Badge>
         </a>
        <a href="https://www.youtube.com/@seif333" target="_blank" className='flex items-center gap-2'>
                 <Badge
          variant="secondary"
          className="bg-red-400 text-sm text-white rounded-full dark:bg-red-500"
        >
          <Youtube  size={23}  />
          Youtube
        </Badge>
          </a>
              </div>
             </div>
    </div>
  )
}

export default Sidebar_home
