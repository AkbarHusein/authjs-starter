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
import { signUpAct } from '@/app/actions/signUp'
import { signUpSchema } from '@/schema/auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function SignUpForm() {
  const router = useRouter()
  const [isShowAlert, setIsShowAlert] = useState<FormAlertprops>()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const submitHandler = async (values: z.infer<typeof signUpSchema>) => {
    setIsShowAlert(undefined)

    try {
      const response = await signUpAct(values)

      if (response) {
        setIsShowAlert({ type: response.type, message: response.message })

        if (response.type === 'success') {
          startTransition(() => router.push('/signin'))
        }
      }
    } catch (error) {
      console.log(error)
      setIsShowAlert({ type: 'error', message: 'Something went wrong!' })
    }
  }

  return (
    <Wrapper
      headerTitle='welcome to savor house!'
      headerDesc='Create an account'
      footerLabel='Already have an account?'
      footerHref='/signin'
      className='w-[600px]'
      showSocial
    >
      <CardContent className='flex flex-col'>
        <FormAlert type={isShowAlert?.type} message={isShowAlert?.message} />
        <Form {...form}>
          <form className='grid grid-cols-2 gap-4' onSubmit={form.handleSubmit(submitHandler)}>
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
            <FormField
              control={form.control}
              name='confirmPassword'
              disabled={isPending}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center'>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          className='py-5 pr-12'
                          placeholder='Enter your confirm password'
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
            <Button className='mt-4 w-full col-span-2' size='lg'>Create an account</Button>
          </form>
        </Form>
      </CardContent>
    </Wrapper>
  )
}
