import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';
import StarIcon from '@/components/icons/StarIcon';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductI } from '@/interfaces';
import { Brand } from '@/interfaces/brand';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function BrandDetails({params} : {params: Params}) {
    const {brandId} = await params ;

    const brandResponse = await fetch('https://ecommerce.routemisr.com/api/v1/brands/'+brandId);
    const {data: brand} : {data: Brand} = await brandResponse.json();

    const proResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
    const {data: products} : {data: ProductI[]} = await proResponse.json()
    
    return <>

    <h2 className='text-xl font-bold pl-3 border-l-4 border-blue-500 mb-5'>{brand.name}</h2>

    {products.length === 0 ?  <div className="text-center py-20">
    <p className="text-xl font-semibold text-gray-500">
        No products available in this category at the moment.
    </p>
  </div> : <div className='grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5'>

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

  </div>}

    </>
}
