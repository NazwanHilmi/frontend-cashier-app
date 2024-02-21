import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainLayout from "@/components/MainLayout";
import MainHeader from "@/components/MainHeader";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CashierApp',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className='flex'>
          <MainHeader />
            <main className='flex-1 flex-row bg-white'>
              <MainLayout> {children} </MainLayout>
            </main>
          </div>
      </body>
    </html>
  )
}
