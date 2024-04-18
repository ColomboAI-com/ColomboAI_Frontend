'use client'

import { Suspense } from "react"
import Loader from "./Loader"
import App from "../../App"

const ProviderComponent = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <App>{children}</App>
    </Suspense>
  )
}

export default ProviderComponent
