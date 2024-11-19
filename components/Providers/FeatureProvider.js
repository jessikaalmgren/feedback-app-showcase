"use client"

import { FeatureContextProvider } from "@context/FeatureContext"

export default function FeatureProviders({ children }) {
  return <FeatureContextProvider>{children}</FeatureContextProvider>
}
