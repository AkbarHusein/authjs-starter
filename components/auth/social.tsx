'use client'

import { Button } from '@/components//ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

export function Social() {
  return (
    <div className='flex w-full gap-2'>
      <Button className='w-full h-10' asChild size='icon' variant='outline' onClick={() => signIn('google')}>
        <FcGoogle />
      </Button>
      <Button className='w-full h-10' asChild size='icon' variant='outline' onClick={() => signIn('github')}>
        <FaGithub />
      </Button>
    </div>
  )
}
