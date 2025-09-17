import Navbar from './components/Navbar'
import Script from 'next/script'
export const metadata = { title: 'TCAS69 Portfolio' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
       <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen font-sans relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
