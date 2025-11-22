"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { flattenError, z } from "zod"
import {signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const formSchema = z.object({
resetCode: z.string().length(6, "Reset code must be 6 digits")
})

type VerifySchema = z.infer<typeof formSchema>

export default function VerifyCode() {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter()

  let searchParams = useSearchParams();
  const email = searchParams.get("email");


  // 1. Define your form.
  const form = useForm<VerifySchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetCode: "",
      
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: VerifySchema) {
    

    try {
      setIsLoading(true);
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        method:'POST',
        body:JSON.stringify({resetCode: values.resetCode}),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        toast.success("Code verified successfully!");
        router.push("/reset-password?email=" + email + '&verified=true');
        
      }else{
        toast.error("Invalid code") 
      }
    } catch (error) {
      toast.error(error || 'error')
    } finally{
      setIsLoading(false)
    }

    // const response = await signIn('credentials', {
    //   callbackUrl: callBackUrl ?? '/',
    //   redirect: true,
    //   email: values.email,
    //   password: values.password
    // });
    
    // console.log(response)
  }

  return (
    <div className='min-h-[60vh] flex flex-col justify-center items-center gap-8'>
    <Card className="p-6 w-sm">
     <Form {...form}>
      {searchParams.get('error') ? <h1 className="text-destructive text-2xl text-center py-3">{searchParams.get('error')}</h1> : ''}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>resetCode</FormLabel>
              <FormControl>
                <Input  placeholder="Enter 6-digit code" type="text" maxLength={6} inputMode="numeric" {...field}   onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, ""); 
                    field.onChange(onlyNumbers);
                }}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button disabled={isLoading} className="w-full cursor-pointer" type="submit">{isLoading && <Loader2 className="animate-spin"/>} Submit</Button>
      </form>
    </Form>
    </Card>
    </div>
  )
}