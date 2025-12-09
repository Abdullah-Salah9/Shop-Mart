'use client'
import { addToWishlistAction } from '@/app/(pages)/products/_action/addToWishlist.action';
import { HeartIcon, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function AddToWishlist({productId}: {productId:string}) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const session = useSession();

    const router = useRouter();

    async function addToWishlist() {
        if (session.status == 'authenticated') {
        setIsLoading(true);
        const data = await addToWishlistAction(productId);
        if (data.status == 'success') {
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
        setIsLoading(false)
        }else{
            router.push('/login')
        }
        
    }

    return <>
        <button onClick={addToWishlist} disabled={isLoading} className='cursor-pointer'>
            {isLoading ? <Loader2 className='animate-spin'/> : <HeartIcon/>}
        </button>
    </>
}
