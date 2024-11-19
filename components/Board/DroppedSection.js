import React from 'react'
import Image from 'next/image'
import { useContext } from 'react'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import { BoardContext } from '@context/BoardContext'
import { FeatureContext } from '@context/FeatureContext'
import droppedIconBig from '@public/icons/droppedicon_big.svg'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'

const DroppedSection = () => {
  const { boardId } = useParams()
  const { boards } = useContext(BoardContext)
  const { features } = useContext(FeatureContext)

  const board = boards.find((board) => board.id === boardId)

  // Check if features is an array, otherwise convert it to an array if it's an object
  const filteredFeatures = Array.isArray(features)
    ? features.filter((feature) => feature.boardId === boardId)
    : features && typeof features === 'object'
    ? Object.values(features).filter((feature) => feature.boardId === boardId)
    : []

  const droppedFeatures = filteredFeatures.filter((feature) => feature.type === 'droppedFeature')

  return (
    <div>
      <section className="pb-10 mb-10 pt-16 mt-[6.5rem] lg:w-full lg:pt-16 lg:flex-grow rounded-xl p-6 bg-[#FFCDD2] h-[550px] overflow-y-auto lg:overflow-visible lg:relative">
        <div className="flex items-center justify-center absolute top-[1595px] left-1/2 lg:top-[-40px] lg:left-[190px] transform -translate-x-1/2 -translate-y-1/2">
          <Image src={droppedIconBig} alt="Picture of the author" />
          <div className="badge badge-md w-[70px] bg-[#B71C1C] border-[#B71C1C] absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 text-xs text-neutral">
            {strings.featureSpecific.dropped}
          </div>
        </div>
        <div className="h-[470px] lg:overflow-y-auto">
          <div className="flex flex-col gap-8">
            {droppedFeatures ? (
              Object.values(droppedFeatures).filter((feature) => feature.type === 'droppedFeature')
                .length > 0 ? (
                Object.values(droppedFeatures)
                  .filter((feature) => feature.type === 'droppedFeature')
                  .map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-neutral p-4 pb-0 w-full lg:w-auto rounded-xl flex-col shadow">
                      <div className="flwx grow">
                        <div className="flex flex-row justify-between items-center align-baseline">
                          <p className="text-sm pb-1 font-medium md:text-sm lg:text-sm">
                            {feature.title}
                          </p>
                          <div className="flex items-start">
                            <div className="flex flex-row badge badge-lg border-[1px] border-[#B71C1C] bg-[#FFCDD2] items-center p-3 mb-2">
                              <ConfirmationNumberOutlinedIcon
                                sx={{ fontSize: '15px', color: '#B71C1C' }}
                              />
                              <p className="text-xs pl-1">
                                {strings.featureSpecific.numberOfVotes}
                              </p>
                              <p className="text-xs pl-1">{feature.totalVotes}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-[10px] pr-2">{feature.description}</p>
                      </div>
                      <div className="divider"></div>
                      {feature.reasonShow ? (
                        <div className="flex flex-row items-center mb-2">
                          <p className="text-xs font-semibold	">{strings.featureSpecific.reason}</p>
                          <div className="badge badge-lg border-[1px] p-3 ml-2 border-[#B71C1C]">
                            <p className="text-xs">{feature.reason}</p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {feature.userName ? (
                        <div className="text-[10px] flex justify-end text-[#696868]">
                          {strings.featureSpecific.sentInUsername} {feature.userName}
                        </div>
                      ) : (
                        ''
                      )}

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
    </div>
  )
}

export default DroppedSection
