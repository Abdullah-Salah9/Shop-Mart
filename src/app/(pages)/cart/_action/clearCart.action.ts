'use server'

import { getUserToken } from "@/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";

export async function clearCartAction() {

        const token = await getUserToken()
    

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'DELETE',
        headers: {
            token: token+'',
        }
    }); 

    const data: CartResponse = await response.json();

    return data
}