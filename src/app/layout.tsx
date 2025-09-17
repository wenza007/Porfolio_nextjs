import Navbar from './components/Navbar'

export const metadata = { title: 'TCAS69 Portfolio' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen font-sans relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
