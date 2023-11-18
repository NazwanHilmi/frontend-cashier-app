import React from 'react'
import Link from 'next/link'

export default function MainHeader() {
    return (
        <div className='bg-red-500 flex justify-between items-center p-4 text-white overflow-x-hidden'>
            <h1 className='text-2xl font-poppins'>Cashier</h1>
            <ul className='flex gap-3 font-poppins'>
                <Link href="/" >
                    <li>Home</li>
                </Link>
                <Link href="/category" >
                    <li>Category</li>
                </Link>
                <Link href="/about" >
                    <li>About</li>
                </Link>
                <Link href="/product" >
                    <li>Product</li>
                </Link>
            </ul>
        </div>
    )
}
