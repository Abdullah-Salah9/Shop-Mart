import { Card, CardTitle } from '@/components/ui/card';
import { Brand } from '@/interfaces/brand';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
  const {data: brandData} : {data: Brand[]} = await response.json();
  console.log(brandData)

  return <>
  
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
    {
      brandData.map((brand) => <Card className='text-center cursor-pointer hover:scale-105 transform transition-all' key={brand._id}>
        <Link href={'/brands/'+brand._id}>
        <div>
          <Image className='size-64 mx-auto object-contain' src={brand.image} alt={brand.name} width={300} height={300}/>
        </div>
        <div>
          <CardTitle>{brand.name}</CardTitle>
        </div>
        </Link>
      </Card>)
    }
  </div>
  
  </>
}
