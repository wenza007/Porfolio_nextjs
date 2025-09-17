'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useStore } from './../store/useStore'
import ImageUploader from './ImageUploader'
import Image from 'next/image'

type FormValues = {
  firstName: string
  lastName: string
  address: string
  phone: string
  school: string
  gpa: string
  skills: string
  reason: string
  majorChoice: string
  university: string
}

export default function FormPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()
  const addPortfolio = useStore(s => s.addPortfolio)
  const router = useRouter()

  // State รูปภาพแต่ละประเภท
  const [photos, setPhotos] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const [awards, setAwards] = useState<string[]>([])
  const [works, setWorks] = useState<string[]>([])

  // Lightbox
  const [lightbox, setLightbox] = useState<{ src: string, visible: boolean }>({ src: '', visible: false })

const onSubmit = (data: FormValues) => {
  addPortfolio({
    id: uuidv4(),
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phone: data.phone,
    school: data.school,
    gpa: Number(data.gpa),
    skills: data.skills,
    reason: data.reason,
    majorChoice: data.majorChoice,
    university: data.university,
    photos,
    activities,
    awards,
    works
  })
  reset()
  setPhotos([]); setActivities([]); setAwards([]); setWorks([])

  alert('ส่งแบบฟอร์มสำเร็จแล้ว!') // ✅ เพิ่มตรงนี้

}

  const fieldClass = "border p-2 rounded w-full"

  const renderImagePreview = (images: string[], setImages: React.Dispatch<React.SetStateAction<string[]>>) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {images.map((url, idx) => (
        <div key={idx} className="relative w-24 h-24">
          <img
            src={url}
            className="w-24 h-24 object-cover rounded border cursor-pointer"
            onClick={() => setLightbox({ src: url, visible: true })}
          />
          <button
            type="button"
            onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )

  const hideLightbox = () => setLightbox({ src: '', visible: false })

  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200 space-y-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">แบบฟอร์ม Portfolio — สมัคร TCAS69</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* ข้อมูลส่วนตัว */}
        <div>
          <label className="block font-semibold">ชื่อ</label>
          <input {...register('firstName', { required: 'กรุณากรอกชื่อ' })} placeholder="เช่น สมชาย" className={fieldClass} />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">นามสกุล</label>
          <input {...register('lastName', { required: 'กรุณากรอกนามสกุล' })} placeholder="เช่น ใจดี" className={fieldClass} />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">ที่อยู่</label>
          <input {...register('address', { required: 'กรุณากรอกที่อยู่' })} placeholder="เช่น 123/45 หมู่บ้าน..." className={fieldClass} />
        </div>

        <div>
          <label className="block font-semibold">เบอร์โทรศัพท์</label>
          <input
            {...register('phone', {
              required: 'กรุณากรอกเบอร์โทรศัพท์',
              pattern: { value: /^[0-9]{9,10}$/, message: 'กรอกตัวเลข 9-10 หลัก' }
            })}
            placeholder="0812345678"
            className={fieldClass}
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">โรงเรียน</label>
          <input {...register('school', { required: 'กรุณากรอกโรงเรียน' })} placeholder="เช่น โรงเรียนสาธิตมหาวิทยาลัย..." className={fieldClass} />
        </div>

        <div>
          <label className="block font-semibold">GPA</label>
          <input type="number" step="0.01" min="0" max="4" {...register('gpa', { required: 'กรุณากรอก GPA' })} placeholder="เช่น 3.75" className={fieldClass} />
        </div>

        <div>
          <label className="block font-semibold">ความสามารถพิเศษ</label>
          <input {...register('skills', { required: 'กรุณากรอกความสามารถพิเศษ' })} placeholder="เช่น วาดภาพ, เขียนโปรแกรม" className={fieldClass} />
        </div>

        <div>
          <label className="block font-semibold">เหตุผลในการสมัคร</label>
          <textarea {...register('reason', { required: 'กรุณากรอกเหตุผล' })} placeholder="เช่น ต้องการพัฒนาความรู้ด้านคอมพิวเตอร์..." className={fieldClass} />
        </div>

        <div>
          <label className="block font-semibold">สาขาที่เลือก</label>
          <input {...register('majorChoice', { required: 'กรุณากรอกสาขาที่เลือก' })} placeholder="เช่น วิทยาการคอมพิวเตอร์" className={fieldClass} />
        </div>

        <div>
          <label className="block font-semibold">มหาวิทยาลัย</label>
          <input {...register('university', { required: 'กรุณากรอกมหาวิทยาลัย' })} placeholder="เช่น จุฬาลงกรณ์มหาวิทยาลัย" className={fieldClass} />
        </div>

        {/* Upload รูป */}
        <div>
          <label className="block font-semibold">รูปภาพนักเรียน</label>
          <ImageUploader multiple onChange={urls => setPhotos(prev => [...prev, ...urls])} />

          {renderImagePreview(photos, setPhotos)}
        </div>

        <div>
          <label className="block font-semibold">กิจกรรม</label>
          <ImageUploader multiple onChange={urls => setActivities(prev => [...prev, ...urls])} />
          {renderImagePreview(activities, setActivities)}
        </div>

        <div>
          <label className="block font-semibold">รางวัล</label>
          <ImageUploader multiple onChange={urls => setAwards(prev => [...prev, ...urls])} />
          {renderImagePreview(awards, setAwards)}
        </div>

        <div>
          <label className="block font-semibold">ผลงาน</label>
          <ImageUploader multiple onChange={urls => setWorks(prev => [...prev, ...urls])} />
          {renderImagePreview(works, setWorks)}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full text-lg font-semibold">ส่งแบบฟอร์ม</button>
      </form>

      {/* Lightbox */}
      {lightbox.visible && (
        <div
          onClick={hideLightbox}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <Image src={lightbox.src} alt="full view" width={800} height={600} className="rounded shadow-lg" />
        </div>
      )}
    </div>
  )
}
