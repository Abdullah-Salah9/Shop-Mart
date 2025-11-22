'use client'
import { Card } from '@/components/ui/card';
import { Order } from '@/interfaces';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'



export default function AllOrders() {
  
  const [orders, setOrders] = useState<Order[]>([])

  async function getOrders() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+ localStorage.getItem('userId'));
    const data: Order[] = await response.json();

    setOrders(data.reverse())
    console.log(data)
  }
  useEffect(()=>{
    getOrders()
  },[])
  
  return <>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4'>
      {orders.map((order) => (
        <Card key={order.id} className='p-4 space-y-3'>
          
          <div className='flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Order #{order.id}</h2>
            <div className='flex gap-2 text-sm'>
              <span
                className={`px-2 py-1 rounded text-white ${
                  order.isPaid ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {order.isPaid ? 'Paid' : 'Not Paid'}
              </span>
              <span
                className={`px-2 py-1 rounded text-white ${
                  order.isDelivered ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              >
                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
              </span>
            </div>
          </div>

          
          <p className='text-sm font-medium'>Total: {order.totalOrderPrice} EGP</p>

          
          <div className='grid grid-cols-2 gap-2 '>
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className='flex flex-col items-center border p-2 rounded shadow-sm'
              >
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className='rounded'
                />
                <p className='text-sm font-medium mt-1 text-center'>{item.product.title}</p>
                <p className='text-xs'>Price: {item.price} EGP</p>
                <p className='text-xs'>Qty: {item.count}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  </>
}
