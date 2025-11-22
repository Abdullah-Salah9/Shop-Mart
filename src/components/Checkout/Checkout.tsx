'use client'
import React, { useRef } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { checkoutSessionAction } from './_action/checkoutSession.action'
import { cashAction } from './_action/cash.action'
import { toast } from 'sonner'
export default function Checkout({cartId}:{cartId:string}) {

    let cityInput = useRef<HTMLInputElement | null>(null)
    let detailsInput = useRef<HTMLInputElement | null>(null)
    let phoneInput = useRef<HTMLInputElement | null>(null)

    async function checkoutSession() {

      if (!cityInput.current?.value.trim() || !detailsInput.current?.value.trim() || !phoneInput.current?.value.trim()) {
        toast.error('please fill all required fields');
      }else{
        const shippingAddress = {
          details: detailsInput.current?.value.trim(),
          phone: phoneInput.current?.value.trim(),
          city: cityInput.current?.value.trim()
        }
        
        const data = await checkoutSessionAction( cartId , shippingAddress)
        
        if (data.status == 'success') {
          location.href = data.session.url
        }
      }

                
        
      }

      async function cash() {
        if (!cityInput.current?.value.trim() || !detailsInput.current?.value.trim() || !phoneInput.current?.value.trim()) {
          toast.error('please fill all required fields');
          
        }else{
          const shippingAddress = {
          details: detailsInput.current?.value.trim(),
          phone: phoneInput.current?.value.trim(),
          city: cityInput.current?.value.trim()
        }
        const data = await cashAction(cartId ,shippingAddress);

        if (data.status == 'success') {
          location.href = '/allorders'
        }
        }
         
      }

return <>

    <Dialog>
    <form>
        <DialogTrigger asChild>
            <Button className='w-full mt-3 h-11 rounded-xl border cursor-pointer'>proceed to checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
                please add Shipping Address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={cash} className='cursor-pointer' type="button">Cash</Button>
            <Button onClick={checkoutSession} className='cursor-pointer' type="submit">Visa</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
</>
}
