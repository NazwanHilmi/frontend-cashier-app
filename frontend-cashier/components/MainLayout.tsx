import React from 'react'
import MainHeader from './MainHeader'

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
    <div className='bg-white w-screen min-h-screen'>
        <MainHeader/>
        <main> {children} </main>
    </div>
    )
}
