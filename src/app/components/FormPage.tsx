'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useStore } from './../store/useStore'
import ImageUploader from './ImageUploader'

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

  const [photos, setPhotos] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const [awards, setAwards] = useState<string[]>([])
  const [works, setWorks] = useState<string[]>([])

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
    router.push('/admin')
  }

  const fieldClass = "border p-2 rounded w-full"

  const renderImagePreview = (images: string[]) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {images.map((url, idx) => (
        <img key={idx} src={url} className="w-24 h-24 object-cover rounded border" />
      ))}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200 space-y-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">แบบฟอร์ม Portfolio — สมัคร TCAS69</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* ฟิลด์ข้อมูลส่วนตัว */}
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

        {/* Upload รูปหลายประเภท */}
        <div>
          <label className="block font-semibold">รูปภาพนักเรียน</label>
          <ImageUploader multiple onChange={(url) => setPhotos(prev => [...prev, url])} />
          {renderImagePreview(photos)}
        </div>

        <div>
          <label className="block font-semibold">กิจกรรม</label>
          <ImageUploader multiple onChange={(url) => setActivities(prev => [...prev, url])} />
          {renderImagePreview(activities)}
        </div>

        <div>
          <label className="block font-semibold">รางวัล</label>
          <ImageUploader multiple onChange={(url) => setAwards(prev => [...prev, url])} />
          {renderImagePreview(awards)}
        </div>

        <div>
          <label className="block font-semibold">ผลงาน</label>
          <ImageUploader multiple onChange={(url) => setWorks(prev => [...prev, url])} />
          {renderImagePreview(works)}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full text-lg font-semibold">ส่งแบบฟอร์ม</button>
      </form>
    </div>
  )
}
