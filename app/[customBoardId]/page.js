'use client'

import { useContext } from 'react'
import strings from '@utils/strings'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { BoardContext } from '@context/BoardContext'
import ExplorePage from '@components/Explore/ExplorePage'

const CustomBoardPage = () => {
  const router = useRouter()
  const { customBoardId } = useParams()

  // Here we get all boards directly from contect, and see if we can find the right board according to the URL
  // to not have to do another API call. But if we don't find the right board, the function is called to make the API call

  // Get state and functions from BoardContext
  const { boards } = useContext(BoardContext)

  // Find the right board from boards array based on the board ID
  const boardData = boards.find((board) => board.id === customBoardId)

  if (!boardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{strings.informationMessages.loading}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="pt-0 pb-0">
        <ExplorePage />
      </div>
    </div>
  )
}

export default CustomBoardPage
