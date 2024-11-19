'use client'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import BoardPage from '@components/Board/BoardPage'
import { BoardContext } from '@context/BoardContext'
import { useEffect, useState, useContext } from 'react'

const DisplayBoardPage = () => {
  const { boardId } = useParams()
  const { boards, fetchBoardByUrl } = useContext(BoardContext)
  const [boardData, setBoardData] = useState(null)
  const [loading, setLoading] = useState(true)

  // When the component renders, check if the boards have been collected and if boardId exists
  useEffect(() => {
    if (boards.length > 0 && boardId) {
      // Find the right board from boards array according to boardId
      const board = boards.find((board) => board.id === boardId)
      if (board) {
        setBoardData(board)
        setLoading(false)
      } else {
        // If board does not exist in Context, get it through the API call
        fetchBoardByUrl(boardId, 'DisplayBoardPage')
          .then((data) => {
            setBoardData(data)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })
      }
    }
  }, [boards, boardId, fetchBoardByUrl]) // If boards or boardId change

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{strings.informationMessages.loading}</p>
      </div>
    )
  }

  if (!boardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{strings.informationMessages.loading}</p>
      </div>
    )
  }

  return (
    <div>
      <div>
        <div className="max-w-screen-xl mx-auto hero">
          <BoardPage />
        </div>
      </div>
    </div>
  )
}

export default DisplayBoardPage
