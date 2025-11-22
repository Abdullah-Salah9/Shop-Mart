'use client'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout() {
  return <>
  
  <div className='min-h-[60vh] flex justify-center items-center flex-col'>
    <div className="flex flex-col items-center justify-center max-w-2xl mb-8">
      <h2 className='text-5xl font-bold  mb-6'>Please login again</h2>
    </div>
    <div className="flex gap-4 items-center">
      
        <Button onClick={()=> signOut({callbackUrl:'/'})} variant={'destructive'} className="cursor-pointer px-8 py-5 ">
            Logout
        </Button>
      
      
    </div>
  </div>
  
  </>
}
