import ToggleTheme from '@/components/toggle-theme'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const HomePage = () => {
  return (
    <>
    <SignedOut>
              <SignInButton mode='modal'>
                <Button>Sign In</Button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <Button variant='outline' className='ml-2'>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <ToggleTheme/>
    </>
  )
}

export default HomePage