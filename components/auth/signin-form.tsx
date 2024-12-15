'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormAlert, FormAlertprops } from '@/components/auth/form-alert'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Wrapper } from '@/components/auth/wrapper'
import { signInAct } from '@/app/actions/signIn'
import { signInSchema } from '@/schema/auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function SignInForm() {
  const router = useRouter()
  const [isShowAlert, setIsShowAlert] = useState<FormAlertprops>()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const submitHandler = async (values: z.infer<typeof signInSchema>) => {
    setIsShowAlert(undefined)

    try {
      const response = await signInAct(values)

      if (response) {
        setIsShowAlert({ type: response.type, message: response.message })

        if (response.type === 'success') {
          startTransition(() => router.push('/dashboard'))
        }
      }
    } catch (error) {
      console.error('Error during sign in:', error)
      setIsShowAlert({ type: 'error', message: 'Something went wrong!' })
    }
  }


  return (
    <Wrapper
      headerTitle='welcome to savor house!'
      headerDesc='Sign in to your account'
      footerLabel="Don&apos;t have an account?"
      footerHref='/signup'
      showSocial
    >
      <CardContent className='flex flex-col'>
        <FormAlert type={isShowAlert?.type} message={isShowAlert?.message} />
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(submitHandler)}>
            <FormField
              control={form.control}
              name='email'
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className='py-5' placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              disabled={isPending}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center'>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          className='py-5 pr-12'
                          placeholder='Enter your password'
                        />
                        <Button
                          type='button'
                          className='absolute right-2 top-1/2 -translate-y-1/2'
                          variant='ghost'
                          size='icon'
                          disabled={isPending}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className='h-5 w-5 text-gray-500' />
                          ) : (
                            <EyeIcon className='h-5 w-5 text-gray-500' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button className='mt-4 w-full' size='lg'>Sign In</Button>
          </form>
        </Form>
      </CardContent>
    </Wrapper>
  )
}
