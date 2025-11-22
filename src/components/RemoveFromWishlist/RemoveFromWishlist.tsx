'use client'
import { removeFromWishlistAction } from '@/app/(pages)/profile/_action/removeFromWishlist.action';
import { HeartOffIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function RemoveFromWishlist({ productId }: { productId: string }) {
  
    const [isLoading, setIsLoading] = useState(false);

    let router = useRouter()
  
    async function removeItem() {
        setIsLoading(true)
        const data = await removeFromWishlistAction(productId);
        router.refresh()
        setIsLoading(false)
        toast.success(data.message);
    }

  return <>
        <button onClick={removeItem} disabled={isLoading} className='cursor-pointer'>
            {isLoading ? <Loader2 className='animate-spin'/> : <HeartOffIcon/>}
        </button>
  </>
}
