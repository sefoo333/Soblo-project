"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

function notFound() {
  return (
    <div className="parent w-full h-screen flex flex-col justify-center items-center">
        <h1 className='text-7xl font-bold'>404</h1>
        <h1 className='font-semibold text-xl'>Oops , Something went wrong</h1>
        <div className="buttons mt-5">
            <Button>
                <Link href={"/"}>Go to Home</Link>
            </Button>
        </div>
    </div>
  )
}

export default notFound
