'use client'
import { ChangeEvent } from 'react'

type ImageUploaderProps = {
  onChange: (url: string) => void
  multiple?: boolean
}

export default function ImageUploader({ onChange, multiple = false }: ImageUploaderProps) {
  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result)
        }
      }
      reader.readAsDataURL(file)
    })
    // Reset input to allow re-upload same files
    e.target.value = ''
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
