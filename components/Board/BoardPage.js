// This is shown when user has clicked on a board on the homepage and ended up on a URL with the board id.
import Link from 'next/link'
import strings from '@utils/strings'
import WonSection from './WonSection'
import VotingSection from './VotingSection'
import { useParams } from 'next/navigation'
import DroppedSection from './DroppedSection'
import { useContext, useEffect } from 'react'
import { BoardContext } from '@context/BoardContext'
import { FeatureContext } from '@context/FeatureContext'

const BoardPage = () => {
  const { boardId } = useParams()
  const { boards } = useContext(BoardContext)
  const { fetchFeaturesByBoardId } = useContext(FeatureContext)

  // Find the right board according to the boardId from URL
  const boardData = boards.find((board) => board.id === boardId)

  useEffect(() => {
    if (boardData?.id) {
      fetchFeaturesByBoardId(boardData.id, 'FeatureComponent')
    }
  }, [boardData?.id, fetchFeaturesByBoardId])

  if (!boardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{strings.informationMessages.loading}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Writing out the boards name and description on top of the board view */}
      <div className="flex flex-col items-center mx-auto pt-8 pb-0 w-[600px] text-center">
        <h1>{boardData.title}</h1>
        <p className="text-sm">{boardData.description}</p>
      </div>
      {/* Linking back to home page */}
      <div className="absolute left-[150px] top-12">
        <Link href="/">
          <button className="border-2 pt-2 pb-2 pr-4 pl-4 rounded-xl hover:bg-neutral-50 text-sm">
            {strings.buttons.goBack}
          </button>
        </Link>
      </div>
      {/* Linking to the backend of the board where user can do more settings */}
      <div className="absolute right-[150px] top-12">
        <Link href={`/${boardData.id}`} key={boardData.id}>
          <button className="border-2 pt-2 pb-2 pr-4 pl-4 rounded-xl hover:bg-neutral-50 text-sm">
            {strings.buttons.exploreBoard}
          </button>
        </Link>
      </div>

      {/* Displaying the sections of features */}
      <div className="p-8 pt-0 m-6 rounded-xl mx-auto w-[500px] lg:w-[1280px] lg:grid lg:grid-cols-3 lg:gap-8">
        <VotingSection />
        <WonSection />
        <DroppedSection />
      </div>
    </div>
  )
}

export default BoardPage
