import { FeatureContext } from '@context/FeatureContext'
import { useContext } from 'react'

export const useFeatureContext = () => {
  const context = useContext(FeatureContext)

  if (!context) {
    throw Error('useFeatureContext must be used inside an FeatureContextProvider')
  }

  return context
}
