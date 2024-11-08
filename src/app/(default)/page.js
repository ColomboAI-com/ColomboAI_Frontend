"use client";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (getCookie("token")) redirect("/feed");
    else redirect("/sign-in");
  }, []);
}
