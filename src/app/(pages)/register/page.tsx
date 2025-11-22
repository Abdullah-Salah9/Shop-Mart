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
  password: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
  name: z.string().min(3),
  phone: z.string().regex(/^01[0-2,5]\d{8}$/, "invalid phone"),
  rePassword: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
}).refine((data)=> data.password === data.rePassword , {
  message: "passwords don't match",
  path:['rePassword']
})

type RegisterSchema = z.infer<typeof formSchema>

export default function RegisterPage() {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter()

  let searchParams = useSearchParams();

  const callBackUrl = searchParams.get('callback-url');

  // 1. Define your form.
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: '',
      name: '',
      phone: '',
      rePassword: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: RegisterSchema) {
    

    try {
      setIsLoading(true);
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method:'POST',
        body:JSON.stringify(values),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        router.push('/login');
        
      }else{
        toast.error('this account has already exist') 
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="your name" type="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="01*********"  {...field} />
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