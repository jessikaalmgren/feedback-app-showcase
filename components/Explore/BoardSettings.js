import { useContext } from 'react'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import { BoardContext } from '@context/BoardContext'

const BoardSettings = () => {
  const { customBoardId } = useParams()
  const { boards } = useContext(BoardContext)

  const boardData = boards.find((board) => board.id === customBoardId)

  return (
    <div>
      <div className="pb-2">
        <div className="p-2 flex flex-row gap-2 items-center">
          <p className="font-semibold text-md">{strings.boardSpecific.title}</p>
        </div>
        <div>{boardData && <div className="text-xs pl-2">{boardData.title}</div>}</div>
      </div>
      <div>
        <div className="p-2 flex flex-row gap-2 items-center">
          <p className="font-semibold text-md">{strings.boardSpecific.boardDescription}</p>
        </div>
        <div>{boardData && <div className="text-xs pl-2">{boardData.description}</div>}</div>
      </div>
      <div className="pt-4">
        {/* <div className="p-2">
          <div className="label">
            <span className="label-text">{strings.boardSpecific.changeTitle}</span>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="New title"
              className="input input-sm input-bordered w-full max-w-xs text-sm"
            />
            <button className="text-sm border rounded-xl pl-2 pr-2">{strings.buttons.save}</button>
          </div>
        </div> */}
        {/* <div className="p-2">
          <div className="label">
            <span className="label-text">{strings.boardSpecific.changeDescription}</span>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="New description"
              className="input input-sm input-bordered w-full max-w-xs text-sm"
            />
            <button className="text-sm border rounded-xl pl-2 pr-2">{strings.buttons.save}</button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default BoardSettings
