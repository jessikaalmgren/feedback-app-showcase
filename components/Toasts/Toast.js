import { useEffect, useRef } from 'react'

const Toast = ({ message, onClose, type }) => {
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      onClose() // Closing the toast after 5 sec
    }, 5000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [message, type])

  let toastClass = 'bg-gray-50 text-gray-700'

  if (type === 'success') {
    toastClass = 'bg-green-50 text-green-700'
  } else if (type === 'error') {
    toastClass = 'bg-red-50 text-red-700'
  } else if (type === 'information') {
    toastClass = 'bg-blue-50 text-blue-700 border border-gray-500'
  }

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`border p-4 rounded-md shadow-md w-76 ${toastClass}`}>
        <div className="flex justify-between">
          <span>{message}</span>
          <button onClick={onClose} className="ml-3 font-bold">
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast
