"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { flattenError, z } from "zod"
import {signIn, signOut} from 'next-auth/react'
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
import { changePasswordAction } from "./_action/changePassword.action"

const formSchema = z.object({
  currentPassword: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
  password: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
  rePassword: z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
}).refine((data)=> data.password === data.rePassword , {
  message: "passwords don't match",
  path:['rePassword']
})

type ChangeSchema = z.infer<typeof formSchema>

export default function ChangePasswordPage() {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter()

  let searchParams = useSearchParams();


  // 1. Define your form.
  const form = useForm<ChangeSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        currentPassword: '',
        password: '',
        rePassword: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: ChangeSchema) {
    

    try {
      setIsLoading(true);
      const response = await changePasswordAction(values);
     if (!response.ok) {
      
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }

    
    toast.success("Password changed successfully!");
    

  } catch (error) {
    router.push("/logout");
    toast.success("password changed successfully ");
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
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
              <FormLabel>New password</FormLabel>
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
              <FormLabel>Confirm New password</FormLabel>
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