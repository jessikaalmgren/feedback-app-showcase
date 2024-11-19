import { useEffect, useRef } from 'react'

const Toast = ({ message, onClose, type }) => {
  const timerRef = useRef(null) // För att hålla koll på timern

  useEffect(() => {
    // Om det finns en tidigare timer, stoppa den innan vi sätter en ny
    if (timerRef.current) {
      // console.log('Stopping old timer')
      clearTimeout(timerRef.current)
    }

    // Sätt en ny timer när en toast visas
    timerRef.current = setTimeout(() => {
      // console.log('Toast closed after 5 seconds')
      onClose() // Stänger toasten efter 5 sekunder
    }, 5000)

    // console.log('New timer set:', timerRef.current)

    // Rensa timer om komponenten tas bort eller om message/type förändras
    return () => {
      if (timerRef.current) {
        // console.log('Clearing timer on unmount or prop change')
        clearTimeout(timerRef.current) // Rensa timer för att förhindra minnesläckage
      }
    }
  }, [message, type]) // Kör om effekten om message eller type ändras

  let toastClass = 'bg-gray-50 text-gray-700' // Default toast

  if (type === 'success') {
    toastClass = 'bg-green-50 text-green-700' // Success toast
  } else if (type === 'error') {
    toastClass = 'bg-red-50 text-red-700' // Error toast
  } else if (type === 'information') {
    toastClass = 'bg-blue-50 text-blue-700 border border-gray-500' // Information toast
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
