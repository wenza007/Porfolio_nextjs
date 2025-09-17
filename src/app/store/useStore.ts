'use client'
import { create } from 'zustand'

export type Portfolio = {
  id:string
  firstName:string
  lastName:string
  address?:string
  phone?:string
  school?:string
  gpa?:number
  skills?:string
  reason?:string
  majorChoice?:string
  university?:string
  photos:string[]
  activities:string[]
  awards:string[]
  works: string[]
}

type Store = {
  portfolios: Portfolio[]
  addPortfolio: (p:Portfolio)=>void
}

export const useStore = create<Store>(set=>({
  portfolios: [],
  addPortfolio: p => set(state=>({ portfolios: [p, ...state.portfolios] }))
}))
