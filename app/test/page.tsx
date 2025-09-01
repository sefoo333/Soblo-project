import { Eye, Heart } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div>
      <h1>Other You Like</h1>
      <div className="posts grid-cols-3 w-[900px] gap-5 grid">
       <div className="post p-5 rounded-md">
             <span className='font-medium text-[13px] text-[#595959] mb-3'>{new Date().toString().slice(0,10)}</span>
         <div className="image w-full h-[200px] bg-red-500"></div>
        <h1 className='font-bold text-3xl'>Post Name</h1>
          <div className="icons flex gap-4 text-[#595959] my-3">
                <div className="views flex gap-2 text-[15px] items-center">
<Eye size={16} />
<span>2</span>
                </div>
                <div className="views flex gap-2 text-[15px] items-center">
                    <Heart  size={16} />
                    <span>3</span>
                </div>
            </div>
       </div>
      </div>
    </div>
  )
}

export default page
