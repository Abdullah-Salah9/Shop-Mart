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
    email: z.email('invalid email').nonempty('email is required'),
    newPassword: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
})

type ResetPasswordSchema = z.infer<typeof formSchema>

export default function ResetPassword() {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter()

  let searchParams = useSearchParams();
  const email = searchParams.get("email");


  // 1. Define your form.
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: email || "",
        newPassword:''
    
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: ResetPasswordSchema) {
    

    try {
      setIsLoading(true);
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        method:'PUT',
        body:JSON.stringify(values),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        toast.success("Password reset successfully!");
        router.push('/login');
        
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="salah@ex" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>new password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
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