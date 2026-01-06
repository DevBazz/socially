'use client'

import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { MoonIcon, Sun } from 'lucide-react'


const ToggleTheme = () => {

    const {theme, setTheme} = useTheme()

  return (
    <div>
        <Button 
        variant="outline"
        size='icon'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
        <Sun className='hidden dark:inline-block w-4 h-4'/>
        <MoonIcon className='inline-block dark:hidden w-4 h-4'/>
        <span className='sr-only'>Toggle Theme</span>
        </Button>
    </div>
  )
}

export default ToggleTheme