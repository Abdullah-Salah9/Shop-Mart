'use client'
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"
import CartContextProvider from "@/components/Context/CartContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Footer from "../Footer/Footer";

export default function Provider({children}: {children : ReactNode}) {
  return (
    <SessionProvider>
          <CartContextProvider>
          <Navbar/>
          <div className="container mx-auto py-4">
            {children}
            <Toaster position="top-center" richColors/>
          </div>
          <Footer/>
        </CartContextProvider>
        </SessionProvider>
  )
}
