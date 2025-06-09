"use client"
import api from '@/app/_api/axios';
import { Input } from '@/components/ui/input'
import { Compass, Search, Tag, TrendingUp } from 'lucide-react'
import Link from 'next/link';
import { title } from 'process';
import React, { useEffect, useState } from 'react'

function Search_input() {
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [titles,setTitles] = useState([])
    const [Tags,setTags] = useState([])

    useEffect(() => { 
api.get("/posts").then((res) => {
      const getTitles = res.data.map((e:any) => {
        return {
            title: e.PostName.toLowerCase(),
            id: e._id
        }
      });
      
      const getTags = res.data.map((e:any) => e.tags.map((tag:string) => tag.toLowerCase()));
        const filteredTitles = getTitles.filter((e:{title:string}) => e.title.includes(searchValue.toLowerCase()));
        const filteredTags = getTags.flat().filter((tag:string) => tag.includes(searchValue.toLowerCase()));

        setTitles(filteredTitles)
        setTags(filteredTags)
}).catch((e) => {
      console.log("error => ", e) 
})
    }, [searchValue]);

  return (
<div className="search relative z-9 max-md:hidden">
      <Input type='text' onChange={(e) => setSearchValue(e.target.value)} onFocus={() => setSearch((r) => !r)} className='pl-8 py-5 w-[280px] max-md:hidden' placeholder='search any posts' />
      <Search  className='absolute top-1/2 translate-[-50%] left-4' size={16} />

     {
        search ? (
             <div className="window bg-white absolute top-full left-0 w-full px-5 py-2 mt-2 rounded-md border border-[#e2dfdf]">
       <div className="posts">
                <h1 className='font-semibold text-md text-[#2e2e2e] pb-1 border-b border-b-[#2e2e2e1c]'>Posts</h1>
                <div className="">
      {titles.map((e:{title:string, id:string}) => (
            <Link href={`/${e.id}`}  key={e.id}>
             <h1 className='flex items-center gap-3 text-gray-800 text-sm py-3 font-semibold'>
            <div className="icon">
                <TrendingUp size={20} />
            </div>
            <span className='text-gray-800'>{e.title.split(" ").slice(0,5).join(" ")} {e.title.split(" ").length > 7 ? "..." : null}</span>
            </h1>
            </Link>
      ))}
      </div>
       </div>
       <div className="topics">
                <h1 className='font-semibold text-md text-[#2e2e2e] pb-1 border-b border-b-[#2e2e2e1c]'>Tags</h1>
       <div className="">
      {Tags.map((e:string, index:number) => (
            <Link href={`/tags/${e.trim()}`} key={index}>
             <h1 className='flex items-center gap-3 text-gray-800 text-sm py-3 font-semibold'>
            <Tag size={20} />
            <span className='text-gray-800'>{e}</span>
            </h1>
            </Link>
      ))}
       </div>
       </div>
     
      </div>
        )
        : null
     }
  </div>
  )
}

export default Search_input
