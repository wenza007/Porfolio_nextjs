'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const path = usePathname()
  const linkClass = (href: string) =>
    `px-4 py-2 rounded font-semibold ${
      path === href ? 'bg-purple-600 text-white' : 'text-purple-700 hover:bg-purple-100'
    }`

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <div className="text-2xl font-bold text-purple-700">TCAS69 Portfolio</div>
        <div className="flex space-x-2">
          <Link href="/" className={linkClass('/')}>สมัครนักศึกษา</Link>
          <Link href="/admin" className={linkClass('/admin')}>หน้าอาจารย์</Link>
        </div>
      </div>
    </nav>
  )
}
