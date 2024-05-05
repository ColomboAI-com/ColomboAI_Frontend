'use client'
import { getCookie } from "cookies-next"
import { redirect } from "next/navigation"

export default function Home() {
  console.log(getCookie('token'))
  if (getCookie('token')) redirect('/feed')
  else redirect('/sign-up')
}
