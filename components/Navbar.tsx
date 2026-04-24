'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton, useUser } from "@clerk/nextjs";

const navItems = [
    {label: 'Library', href: '/'},
    {label: 'Add New', href: '/books/new'},
]


const Navbar = () => {
    const path = usePathname();
    const {user} = useUser();
  return (
   <header className="w-full fixed  z-50 bg-('--primary')">
    <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href={'/'} className='flex gap-0.5 items-center'>
        <Image src='/assets/assets/logo.png' alt='Bookified' className='rounded-full' width={42} height={26}/>
        <span className='logo-text'>Bookified</span>
        </Link>

    <nav className='w-fit flex gap-7.5 items-center'>
  {navItems.map(({label,href})=>{
    const isActive = path === href || href !== '/' && path.startsWith(href);
    return (
        <Link key={label} href={href} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')}>{label}</Link>
    )

  })}

<div className="flex gap-8 items-center">
   <Show when="signed-out">
                <SignUpButton  />
              </Show>
              <Show when="signed-in">
                <div className='nav-user-link'>
                <UserButton />
                {user?.firstName && <Link href={'/subscriptions'} className='nav-user-name'>{user.firstName}</Link>}
                </div>
              </Show>
</div>

    </nav>
    </div>

   </header>
  )
}

export default Navbar
