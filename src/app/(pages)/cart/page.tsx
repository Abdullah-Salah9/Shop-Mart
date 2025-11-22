'use client'
import Loading from '@/app/loading'
import Checkout from '@/components/Checkout/Checkout'
import { CartContext } from '@/components/Context/CartContext'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/Helpers/formatPrice'
import { CartResponse } from '@/interfaces'
import { console } from 'inspector'
import { Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { clearCartAction } from './_action/clearCart.action'
import { removeCartItemAction } from './_action/removeCartItem.action'
import { updateCartItemAction } from './_action/updateCartItem.action'





export default function Cart() {

  const {cartData , isLoading, getCart, setCartData} = useContext(CartContext);

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  if (typeof cartData?.data?.products[0]?.product == 'string' || cartData == null) { getCart()};

  async function removeCartItem(productId:string) {
    setRemovingId(productId)
    const data = await removeCartItemAction(productId)
    
    if (data.status == 'success') {
      toast.success('Product Removed Successfully');
      setCartData(data);
    }
    setRemovingId(null)
  }


  async function updateCartItem(productId:string, count: number) {
    setUpdateId(productId)
    const data = await updateCartItemAction(productId, count)
    
    if (data.status == 'success') {
      toast.success('Product Updated Successfully');
      setCartData(data);
    }
    setUpdateId(null)
  }


  async function clearCart() {
    setIsClearing(true);
    const data = await clearCartAction()
    if (data.message == 'success') {
      setCartData(null)
    }
    setIsClearing(false);
    
  }

  


  return <>
{isLoading || typeof cartData?.data?.products[0]?.product == 'string'? <Loading/> : cartData?.numOfCartItems! > 0?
  <div className='container mx-auto px-4 py-6'>
    <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
    <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} items in your cart</p>

    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6'>
      {/* items column */}
      <div className='lg:col-span-2 space-y-4'>
        {cartData?.data.products.map((item)=><div key={item._id} className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
          <Image src={item.product.imageCover} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' alt='' width={400} height={400}/>
          
          <div className='flex-1 min-w-0'>
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
              <div className='min-w-0'>
                <h3 className='font-semibold text-base md:text-lg line-clamp-2'>{item.product.title}</h3>
                <p className='text-sm text-muted-foreground mt-1'>{item.product.brand.name} . {item.product.category.name}</p>
              </div>

              <div className='text-right shrink-0'>
                <div className='font-semibold'>
                  {formatCurrency(item.price)}
                </div>
              </div>
            </div>

            <div className='mt-3 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <button onClick={()=> updateCartItem(item.product.id , item.count - 1)}
                aria-label='decrease'
                disabled={item.count == 1}  
                className='size-8 rounded-lg border hover:bg-accent cursor-pointer'>
                  -
                </button>
                <span className='w-6 text-center font-medium'>{updateId == item.product.id ? <Loader2 className='animate-spin size-4'/>: item.count}</span>
                <button onClick={()=> updateCartItem(item.product.id , item.count + 1)}
                aria-label='increase'
                className='size-8 rounded-lg border hover:bg-accent cursor-pointer'>
                  +
                </button>
              </div>
              <button onClick={()=> removeCartItem(item.product.id)} disabled={removingId == item.product.id}
              aria-label='remove'
              className='text-destructive hover:underline text-sm flex items-center gap-1 cursor-pointer'>
                {removingId == item.product.id && <Loader2 className='animate-spin size-3'/>}Remove
              </button>
            </div>
          </div>
        </div> )}
      </div>
      {/* summary column */}
      <div className='lg:col-span-1 sticky top-18'>
        <div className='rounded-xl border p-5 shadow-sm'>
          <h2 className='text-lg font-semibold'>Order Summary</h2>
          <div className='mt-4 space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Subtotal ({cartData?.numOfCartItems} items)
              </span>
              <span className='font-semibold'>{formatCurrency(cartData?.data.totalCartPrice!)}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Shipping</span>
              <span className='text-emerald-600 font-medium'>Free</span>
            </div>
          </div>

          <div className='my-4 border-t pt-3'>

            <div className='flex items-center justify-between'>
              <span className='text-base font-semibold'>Total</span>
              <span className='text-base font-bold'>{formatCurrency(cartData?.data.totalCartPrice!)}</span>
            </div>

            <Checkout cartId={cartData?.cartId!}/>
            <Link href={'/products'}>
            <button className='w-full mt-3 h-11 rounded-xl border hover:bg-accent cursor-pointer'>
              continue shopping
            </button>
            </Link>
          </div>
        </div>
        <Button onClick={clearCart} variant={'outline'} className='text-destructive hover:text-destructive mt-2 ms-auto flex cursor-pointer '>{isClearing ? <Loader2 className='animate-spin'/> : <Trash2/>} Clear Cart</Button>
      </div>
    </div>
  </div> : 
  <div className='min-h-[60vh] flex justify-center items-center flex-col'>
    <h2 className='text-2xl mb-3'>Your Cart Is Empty</h2>
    <Link href={'/products'}>
      <Button className=''>
        Add Ones
      </Button>
    </Link>
  </div>
}
  </>
}
