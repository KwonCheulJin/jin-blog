import Link from 'next/link'
import React from 'react'

import { Nanum_Gothic } from 'next/font/google'

const gothic = Nanum_Gothic({
  weight:"700",
  subsets: ['latin']
})

export default function Header() {
  return (
    <header className='flex item-center justify-between p-4'>
      <h1 className={`${gothic.className} text-3xl font-bold`} >
        <Link href="/">{"Jin's Blog"}</Link>
      </h1>
      <nav className='flex gap-4'>
        <Link href="/">home</Link>
        <Link href="/about">About</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  )
}
