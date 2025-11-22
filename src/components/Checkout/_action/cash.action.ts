'use server'

import { getUserToken } from "@/Helpers/getUserToken"

export async function cashAction(cartId ,shippingAddress) {
    const token = await getUserToken();

    const response = await fetch( `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
          method: 'POST',
          body: JSON.stringify({shippingAddress}),
          headers: {
            token: token+'',
            'Content-Type': 'application/json'
          } 
        });
        const data = await response.json();
        return data
}