'use server'

import { getUserToken } from "@/Helpers/getUserToken";


export async function checkoutSessionAction(cartId ,shippingAddress) {

        const token = await getUserToken()
    
    const response = await fetch( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
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