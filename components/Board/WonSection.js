import React from 'react'
import Image from 'next/image'
import { useContext } from 'react'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import wonIconBig from '@public/icons/wonicon_big.svg'
import { FeatureContext } from '@context/FeatureContext'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'

const WonSection = () => {
  const { boardId } = useParams()
  const { features } = useContext(FeatureContext)

  const filteredFeatures = Array.isArray(features)
    ? features.filter((feature) => feature.boardId === boardId)
    : features && typeof features === 'object'
    ? Object.values(features).filter((feature) => feature.boardId === boardId)
    : []

  const wonFeatures = Array.isArray(filteredFeatures)
    ? filteredFeatures.filter((feature) => feature.type === 'wonFeature')
    : []

  return (
    <div>
      <section className="pb-10 mb-10 pt-16 mt-[6.5rem] lg:w-full lg:pt-16 lg:flex-grow rounded-xl p-6 bg-[#E8F5E9] h-[550px] overflow-y-auto lg:overflow-visible lg:relative">
        <div className="flex items-center justify-center absolute top-[895px] lg:top-[-40px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image src={wonIconBig} alt="Picture of the author" />
          <div className="badge badge-md w-[70px] bg-[#1B5E20] border-[#1B5E20] absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 text-xs text-neutral">
            {strings.featureSpecific.won}
          </div>
        </div>
        <div className="h-[470px] lg:overflow-y-auto">
          <div className="flex flex-col gap-8">
            {wonFeatures ? (
              Object.values(wonFeatures).filter((feature) => feature.type === 'wonFeature').length >
              0 ? (
                Object.values(wonFeatures)
                  .filter((feature) => feature.type === 'wonFeature')
                  .map((feature) => (
                    <div
                      key={feature.id}
                      className={`bg-neutral p-4 pb-0 w-full lg:w-auto rounded-xl flex-col shadow 
                        ${
                          feature.status === 'In progress'
                            ? 'border-green-700 border-2 border-dashed'
                            : ''
                        } 
                        ${feature.status === 'Released' ? 'border-green-700 border-2' : ''}`}>
                      <div className="flwx grow">
                        <div className="flex flex-row justify-between items-center align-baseline">
                          <p className="text-sm pb-1 font-medium md:text-sm lg:text-sm">
                            {feature.title}
                          </p>
                          <div className="flex items-start">
                            <div className="flex flex-row badge badge-lg border-[1px] border-[#1B5E20] bg-[#E8F5E9] items-center mt-0 p-3 mb-2">
                              <ConfirmationNumberOutlinedIcon
                                sx={{ fontSize: '15px', color: '#1B5E20' }}
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
                      <div className="divider mb-3"></div>
                      {feature.statusShow ? (
                        <div className="flex flex-row items-center">
                          <p className="text-xs font-semibold">{strings.featureSpecific.status}</p>
                          <div
                            className={`badge badge-lg border-[1px] p-3 ml-2 border-[#1B5E20] ${
                              feature.status === 'Released' ? 'bg-green-700 text-white' : ''
                            }${feature.status === 'Not started' ? 'border-0 p-0' : ''}`}>
                            <p className="text-xs">{feature.status}</p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className="text-[10px] flex justify-end text-[#696868]">
                        {strings.featureSpecific.sentInUsername} {feature.userName}
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
    </div>
  )
}

export default WonSection
