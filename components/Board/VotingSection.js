import Image from 'next/image'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import Toast from '@components/Toasts/Toast'
import React, { useState, useContext } from 'react'
import { BoardContext } from '@context/BoardContext'
import FeatureForm from '@components/Forms/FeatureForm'
import { FeatureContext } from '@context/FeatureContext'
import votingIconBig from '@public/icons/votingicon_big.svg'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'

const VotingSection = () => {
  const { boardId } = useParams()
  const { boards } = useContext(BoardContext)
  const { features } = useContext(FeatureContext)
  const { voteOnFeature } = useContext(FeatureContext)
  const [votedMessage, setVotedMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const board = boards.find((board) => board.id === boardId)

  const filteredFeatures = Array.isArray(features)
    ? features.filter((feature) => feature.boardId === boardId)
    : features && typeof features === 'object'
    ? Object.values(features).filter((feature) => feature.boardId === boardId)
    : []

  const votingFeatures = Array.isArray(filteredFeatures)
    ? filteredFeatures.filter((feature) => feature.type === 'votingFeature')
    : []

  const handleVote = async (id, voteType) => {
    const votedBoards = JSON.parse(localStorage.getItem('votedBoards')) || []

    // Check if the user has already voted
    if (votedBoards.includes(id)) {
      setVotedMessage(strings.errorMessages.alreadyVoted)
      return
    }

    // Call the voteOnFeature function from FeatureContext
    const { success, data, error } = await voteOnFeature(id, voteType, 'VotingSection')

    if (success) {
      // If the vote was successful, add the ID to localStorage and show message
      localStorage.setItem('votedBoards', JSON.stringify([...votedBoards, id]))
      setSuccessMessage(strings.successMessages.votingSuccessful)
    } else {
      // If an error occurred, show error message
      setErrorMessage(error || strings.errorMessages.error)
    }
  }

  // Reset voting function only to be used when testing
  // const resetVoting = () => {
  //   localStorage.removeItem('votedBoards')
  //   setVotedMessage('Voting has been reset. You can vote again!')
  // }

  return (
    <div>
      <section className="pb-10 mb-10 pt-10 mt-[6.5rem] mx-auto w-[400px] lg:pt-16 lg:flex-grow rounded-xl p-6 bg-[#EDE7F6] h-[550px] overflow-y-auto lg:overflow-visible lg:relative">
        <div className="flex items-center justify-center absolute top-[235px] lg:top-[-40px] left-1/2 lg:left-[193px] transform -translate-x-1/2 -translate-y-1/2">
          <Image src={votingIconBig} alt="Picture of the author" />
          <div className="badge badge-md w-[70px] bg-[#311B92] border-[#311B92] absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 text-xs text-neutral">
            {strings.featureSpecific.voting}
          </div>
        </div>
        <div className="bg-neutral rounded-xl p-2 mb-4 pl-4 border-2 border-dotted border-[#D1C4E9] cursor-pointer w-full flex justify-start">
          <FeatureForm board={board} />
        </div>
        <div className="h-[400px] lg:overflow-y-auto">
          <div className="flex flex-col gap-8">
            {votingFeatures ? (
              Object.values(votingFeatures).filter((feature) => feature.type === 'votingFeature')
                .length > 0 ? (
                Object.values(votingFeatures)
                  .filter((feature) => feature.type === 'votingFeature')
                  .map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-neutral p-4 pb-0 w-full lg:w-auto rounded-xl flex-col shadow">
                      <div className="flwx grow">
                        <div className="flex flex-row justify-between items-center align-baseline">
                          <p className="text-sm pb-1 font-medium md:text-sm lg:text-sm">
                            {feature.title}
                          </p>
                          <div className="flex items-start"></div>
                        </div>
                        <p className="text-[10px] pr-2">{feature.description}</p>
                        <div className="flex flex-row items-center justify-center gap-3 pt-3 relative">
                          <button
                            className="text-[#81C784] cursor-pointer"
                            onClick={() => handleVote(feature.id, 'upvote')}>
                            <ArrowCircleUpOutlinedIcon />
                          </button>
                          <div className="text-[#311B92]">
                            <CircleOutlinedIcon sx={{ fontSize: '45px' }} />
                          </div>
                          <div className="absolute text-sm">{feature.totalVotes}</div>
                          <button
                            className="text-[#E57373] cursor-pointer"
                            onClick={() => handleVote(feature.id, 'downvote')}>
                            <ArrowCircleDownOutlinedIcon />
                          </button>
                        </div>
                        {feature.userName ? (
                          <p className="flex justify-end text-[10px] text-[#696868]">
                            {strings.featureSpecific.sentInUsername} {feature.userName}
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="flex flex-row justify-center pt-4"></div>
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-500">{strings.featureSpecific.noFeatures}</p>
              )
            ) : (
              <p className="text-center text-gray-500">{strings.featureSpecific.noFeatures}</p>
            )}
          </div>
        </div>
      </section>
      {/* Reset button only to be used while testing */}
      {/* <button
        className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        onClick={resetVoting}>
        Reset Voting
      </button> */}

      {successMessage && (
        <Toast message={successMessage} onClose={() => setSuccessMessage('')} type="success" />
      )}

      {votedMessage && (
        <Toast message={votedMessage} onClose={() => setVotedMessage('')} type="information" />
      )}

      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage('')} type="error" />
      )}
    </div>
  )
}

export default VotingSection
