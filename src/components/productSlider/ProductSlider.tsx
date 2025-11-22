'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function ProductSlider({images , altContent}:{images: string[] , altContent: string}) {
  return  <Carousel   opts={{
                    loop: true,
            }} 
            plugins={[
                    Autoplay({
                    delay: 2000,
            }),
      ]}>
            <CarouselContent>
                {images.map((image, index)=><CarouselItem key={index}><Image src={image} className='w-full' alt={altContent} width={600} height={600}/></CarouselItem> )}
            </CarouselContent>
        </Carousel>
}
