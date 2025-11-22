import { ProductI } from '@/interfaces';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import StarIcon from '@/components/icons/StarIcon';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';

export default async function Products() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const {data : products} : {data : ProductI[]} = await response.json();
  
  
  return <>
  
  <div className='grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5'>

    {
      products.map((product) => 
      <div key={product.id} className="">
        
          <Card>
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
            <AddToWishlist productId={product.id}/>
          </CardFooter>
          </Card>
        
      </div>)
    }

  </div>

  </>
}
