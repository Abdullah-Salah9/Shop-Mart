'use server'

import { getUserToken } from "@/Helpers/getUserToken";


export async function changePasswordAction(values:any) {

    const token = await getUserToken()

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
        method:'PUT',
        body:JSON.stringify(values),
        headers:{
            token: token+'',
          'Content-Type': 'application/json'
        }
      });

      return response
}