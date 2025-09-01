import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
  <div className="parent flex-col w-full   flex items-center">
     <div className="navbar w-full ">
                <Skeleton className="h-20 w-full  bg-gray-300 rounded-none" />
            </div>
    <div className="container flex justify-center mt-5 items-center">
          <div className="skeletons flex items-center  flex-col gap-5 w-full" style={{width:"100%"}}>
                  <div className="flex flex-col gap-5 w-[800px] max-xl:w-full">
                      <Skeleton className="h-8 w-[600px] max-xl:w-[70%] rounded-full bg-gray-300" />
                  <Skeleton className="h-8 w-[400px] max-xl:w-[50%] rounded-full bg-gray-300" />
                  </div>
<div className="banner w-full flex justify-center">
          <Skeleton className="h-[400px] w-[800px] max-xl:w-full max-md:w-full max-md:h-[200px] rounded-xl bg-gray-300" />
</div>
      <div className="flex justify-center mt-5 w-full max-md:px-5">
        <div className="text flex flex-col items-center w-full justify-center gap-5 ">
                  <Skeleton className="h-6 w-[600px] max-xl:w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-6 w-[600px] max-xl:w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-6 w-[600px] max-xl:w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-6 w-[600px] max-xl:w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-6 w-[600px] max-xl:w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-6 w-[600px] max-xl:w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-6 w-[600px] max-xl:w-full rounded-full bg-gray-300" />
     

      </div>
      </div>
          </div>
    </div>
  </div>
  )
}

export default loading
