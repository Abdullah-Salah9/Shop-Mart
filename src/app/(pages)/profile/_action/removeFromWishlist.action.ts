'use server'

import { getUserToken } from "@/Helpers/getUserToken";


export async function removeFromWishlistAction(productId:string) {

    const token = await getUserToken()

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/'+productId , {
            method:'DELETE',
            headers:{
                token:token+''
            }
        });
        const data = await response.json();

        return data
}