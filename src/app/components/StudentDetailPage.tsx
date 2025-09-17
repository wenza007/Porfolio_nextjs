'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useStore } from '../store/useStore'
import Image from 'next/image'

export default function StudentDetailPage() {
  const params = useParams()
  const student = useStore(s => s.portfolios.find(p => p.id === params.id))
  const [lightbox, setLightbox] = useState<{src: string, visible: boolean}>({src:'', visible:false})

  if (!student) return <div className="text-center mt-10 text-red-500">ไม่พบข้อมูลนักศึกษา</div>

  const showImage = (src: string) => setLightbox({src, visible:true})
  const hideImage = () => setLightbox({src:'', visible:false})

  const renderImages = (title: string, images: string[]) => (
    <div>
      <h3 className="font-semibold text-lg mt-4">{title}</h3>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {images.map((src, idx) => (
          <div key={idx} className="relative w-full h-24 cursor-pointer" onClick={() => showImage(src)}>
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover rounded hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow space-y-4">
      <h1 className="text-3xl font-bold text-purple-700 text-center">{student.firstName} {student.lastName}</h1>

      <div className="grid grid-cols-2 gap-4">
        <div><strong>GPA:</strong> {student.gpa ?? '-'}</div>
        <div><strong>โรงเรียน:</strong> {student.school}</div>
        <div><strong>สาขา:</strong> {student.majorChoice}</div>
        <div><strong>มหาวิทยาลัย:</strong> {student.university}</div>
        <div className="col-span-2"><strong>เหตุผลในการสมัคร:</strong> {student.reason}</div>
        <div className="col-span-2"><strong>ความสามารถพิเศษ:</strong> {student.skills}</div>
        <div className="col-span-2"><strong>ที่อยู่:</strong> {student.address}</div>
        <div className="col-span-2"><strong>เบอร์โทรศัพท์:</strong> {student.phone}</div>
      </div>

      {renderImages('รูปภาพนักเรียน', student.photos)}
      {renderImages('กิจกรรม', student.activities)}
      {renderImages('รางวัล', student.awards)}
      {renderImages('ผลงาน', student.works)}

      {lightbox.visible && (
        <div
          onClick={hideImage}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <Image src={lightbox.src} alt="Full view" width={800} height={600} className="rounded shadow-lg" />
        </div>
      )}
    </div>
  )
}
