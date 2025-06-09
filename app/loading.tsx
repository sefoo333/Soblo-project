"use client"
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div className="parent w-full justify-center h-screen">
        <div className="navbar w-full">
            <Skeleton className="h-20 w-full bg-gray-300 rounded-none" />
        </div>

        <div className="parent">
            <div className="container w-full flex justify-center items-center">
            <div className="flex-col gap-5 w-full h-[calc(100vh-80px)] flex justify-center items-center">
                <div className="post flex justify-between items-center w-full max-w-3xl p-5  rounded-md ">
                    <div className="p flex flex-col gap-2">
                        <Skeleton className="h-4 w-10 bg-gray-300 rounded-md" />
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
                    </div>
                    <div className="image">
      <Skeleton className="h-[125px] w-[250px] bg-gray-300 rounded-xl" />
                    </div>
                </div>
                <div className="post flex justify-between items-center w-full max-w-3xl p-5  rounded-md ">
                    <div className="p flex flex-col gap-2">
                        <Skeleton className="h-4 w-10 bg-gray-300 rounded-md" />
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
                    </div>
                    <div className="image">
      <Skeleton className="h-[125px] w-[250px] bg-gray-300 rounded-xl" />
                    </div>
                </div>
                <div className="post flex justify-between items-center w-full max-w-3xl p-5  rounded-md ">
                    <div className="p flex flex-col gap-2">
                        <Skeleton className="h-4 w-10 bg-gray-300 rounded-md" />
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
                    </div>
                    <div className="image">
      <Skeleton className="h-[125px] w-[250px] bg-gray-300 rounded-xl" />
                    </div>
                </div>
                <div className="post flex justify-between items-center w-full max-w-3xl p-5  rounded-md ">
                    <div className="p flex flex-col gap-2">
                        <Skeleton className="h-4 w-10 bg-gray-300 rounded-md" />
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
                    </div>
                    <div className="image">
      <Skeleton className="h-[125px] w-[250px] bg-gray-300 rounded-xl" />
                    </div>
                </div>
            </div>
            <div className="flex-col gap-5 w-full h-[calc(100vh-80px)] basis-[30%] flex justify-center items-center">
               <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>
               <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>
               <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>
               <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>
               <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>
               <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>
               <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>

            </div>
        </div>
        </div>
    </div>
  )
}

export default loading
