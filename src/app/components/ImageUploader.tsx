'use client'
import { ChangeEvent } from 'react'

type ImageUploaderProps = {
  onChange: (urls: string[]) => void
  multiple?: boolean
}

export default function ImageUploader({ onChange, multiple = false }: ImageUploaderProps) {
  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)

    // อ่านไฟล์ทั้งหมดพร้อมกัน
    Promise.all(files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result)
          else reject('Error reading file')
        }
        reader.readAsDataURL(file)
      })
    }))
    .then(urls => {
      onChange(urls) // ส่งครั้งเดียว
    })

    e.target.value = '' // reset input
  }

  return (
    <input
      type="file"
      accept="image/*"
      multiple={multiple}
      onChange={handleFiles}
      className="border p-2 rounded w-full cursor-pointer text-gray-700"
    />
  )
}
