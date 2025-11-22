'use client'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { HeartIcon, Loader, Loader2, ShoppingCartIcon } from 'lucide-react'
import { CardFooter } from '../ui/card'
import { toast } from 'sonner'
import { CartContext } from '../Context/CartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AddToWishlist from '../AddToWishlist/AddToWishlist'

export default function AddToCart({productId } : {productId : string}) {

    const [isLoading, setIsLoading] = useState(false);

    const {getCart, setCartData} = useContext(CartContext);

    const session = useSession();

    let router = useRouter()

    async function addToCart() {
        if (session.status == 'authenticated') {
            setIsLoading(true)
        const data = await addToCartAction(productId )
        
        if (data.status == 'success') {
            toast.success(data.message)
        }else {
            toast.error(data.message)
        }
        // await getCart()
        setCartData(data);
        setIsLoading(false);
        console.log(data);
        }else{
            router.push('/login')
        }
    }

  return (
        
            <Button disabled={isLoading} onClick={addToCart} className='grow cursor-pointer'>{isLoading ? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/> } Add To Cart</Button>
        
  )
}
