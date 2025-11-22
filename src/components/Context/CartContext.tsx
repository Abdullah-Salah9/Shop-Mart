'use client'
import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import React, { createContext, ReactNode, useEffect, useState } from "react";


export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null)=>  void,
    isLoading: boolean,
    setIsLoading: (value: boolean)=>  void,
    getCart: ()=>  void
}>({
    cartData: null,
    setCartData: ()=> { },
    isLoading: false, 
    setIsLoading: ()=> { },
    getCart: ()=> { }
});

export default function CartContextProvider({children} : {children : ReactNode}){

    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getCart() {
        if (session.status == 'authenticated') {
            const response = await fetch('http://localhost:3000/api/get-cart');
            const data : CartResponse = await response.json();
            setCartData(data);
            if (cartData?.data.cartOwner) {
                localStorage.setItem('userId' , cartData?.data.cartOwner)
            }
            setIsLoading(false);
            console.log(data);

        }
    }
    const session = useSession()
    useEffect(()=>{
        
            getCart();
        
    },[session.status])

    return <CartContext.Provider value={{cartData, setCartData ,isLoading, setIsLoading, getCart }}>
        {children}
    </CartContext.Provider>


}