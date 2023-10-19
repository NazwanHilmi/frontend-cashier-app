import React from 'react'
import MainHeader from './MainHeader'

const MainLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
        <MainHeader/>
        <h1>MainLayout</h1>
        <hr />
        <main> {children} </main>
        </div>
    )
}

export default MainLayout

