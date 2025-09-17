'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useStore, Portfolio } from '../store/useStore'

type SortKey = 'submission' | 'name' | 'gpa'

export default function AdminPage() {
  const list = useStore(s => s.portfolios)
  const [sortKey, setSortKey] = useState<SortKey>('submission')
  const [dir, setDir] = useState<'asc' | 'desc'>('asc')

  const rows = useMemo(() => {
    const copy = [...list]
    copy.sort((a: Portfolio, b: Portfolio) => {
      if (sortKey === 'submission') {
        return dir === 'asc' ? 0 : 0 // ลำดับการส่งตาม array ต้นฉบับ, สลับทิศทาง dir
      }
      if (sortKey === 'gpa') {
        const gpaA = a.gpa ?? 0
        const gpaB = b.gpa ?? 0
        return dir === 'asc' ? gpaA - gpaB : gpaB - gpaA
      }
      if (sortKey === 'name') {
        const nameA = (a.firstName + ' ' + a.lastName).toLowerCase()
        const nameB = (b.firstName + ' ' + b.lastName).toLowerCase()
        return dir === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
      }
      return 0
    })
    return copy
  }, [list, sortKey, dir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setDir('asc')
    }
  }

  const arrow = (key: SortKey) => sortKey === key ? (dir==='asc' ? '↑' : '↓') : ''

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
      <h1 className="text-3xl font-bold text-purple-700 text-center">หน้าอาจารย์ — รายชื่อนักศึกษา</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 cursor-pointer" onClick={() => toggleSort('submission')}>
              ลำดับการส่ง {arrow('submission')}
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => toggleSort('name')}>
              ชื่อ-นามสกุล {arrow('name')}
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => toggleSort('gpa')}>
              GPA {arrow('gpa')}
            </th>
            <th className="border p-2">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, index) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{index+1}</td>
              <td className="border p-2">{s.firstName} {s.lastName}</td>
              <td className="border p-2 text-center">{s.gpa ?? '-'}</td>
              <td className="border p-2 text-center">
                <Link href={`/student/${s.id}`} className="text-blue-600 hover:underline">ดูรายละเอียด</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
