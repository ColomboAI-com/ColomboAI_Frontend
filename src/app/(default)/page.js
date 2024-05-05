'use client'
import { getCookie } from "cookies-next"
import { redirect } from "next/navigation"

export default function Home() {
  if (getCookie('token')) redirect('/feed')
  else redirect('/sign-up')
}
