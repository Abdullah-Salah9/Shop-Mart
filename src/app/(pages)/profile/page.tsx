'use server'
import AddToCart from '@/components/AddToCart/AddToCart';
import StarIcon from '@/components/icons/StarIcon';
import RemoveFromWishlist from '@/components/RemoveFromWishlist/RemoveFromWishlist';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserToken } from '@/Helpers/getUserToken'
import { ProductI } from '@/interfaces';
import { WishListResponse } from '@/interfaces/wishlist';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Profile() {

  const token = await getUserToken()

  
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      method:'GET',
      headers: {
        token: token+''
      }
    });
    const responseData: WishListResponse = await response.json()
    const products: ProductI[] = responseData.data
    
  

  return <>

<Card className="mb-5 p-4 flex justify-between items-center shadow-md">
      <h2 className="text-lg font-semibold">My Profile</h2>
      <Link href="/change-password" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">      
        Change Password
      </Link>
    </Card>

    <h2 className='text-xl font-bold pl-3 border-l-4 border-blue-500 mb-5'>Wishlist</h2>

  {
    products ?    


  
  
  <div className='grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5'>

    {
      products.map((product) => 
      <div key={product.id} className="">
        
          <Card className='relative'>
            <div className='absolute top-2 right-2 hover:bg-red-500 hover:text-white transition-all duration-200 p-2 rounded-full shadow-md z-20'>
            <RemoveFromWishlist productId={product.id}/>
            </div>
          <Link href={'/products/'+product.id}>
          <Image className='w-full' src={product.imageCover} alt='' width={300} height={300}/>
          <CardHeader>
            <CardTitle>{product.title.split(' ' , 2).join(' ')}</CardTitle>
            <CardDescription>{product.category.name}</CardDescription>
            <CardAction>{product.brand.name}</CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className='flex'>
                
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                
              </div>
              
              <p>{product.ratingsAverage}</p>
            </div>
            <p className='pt-2'>price : <span className='text font-bold'>{product.price} EGP</span></p>
          </CardContent>
          </Link>
          
          <CardFooter className='gap-1'>
            <AddToCart productId={product.id}/>
          </CardFooter>
          
          
          
          </Card>
        
      </div>)
    }

  </div>           :   <div className='min-h-[60vh] flex justify-center items-center flex-col'>
    <h2 className='text-2xl mb-3'>Your Wishlist Is Empty</h2>
    <Link href={'/products'}>
      <Button className=''>
        Add Ones
      </Button>
    </Link>
  </div>
  }

    
  

  
  </>
}
