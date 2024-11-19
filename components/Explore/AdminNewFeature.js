import Image from 'next/image'
import strings from '@utils/strings'
import Toast from '@components/Toasts/Toast'
import { useContext, useState } from 'react'
import { useParams } from 'next/navigation'
import { FeatureContext } from '@context/FeatureContext'
import lightIconBig from '@public/icons/lighticon_big.svg'

const AdminNewFeature = () => {
  const { customBoardId } = useParams()
  const { features, acceptFeature, denyFeature } = useContext(FeatureContext)
  const [successMessageDeny, setSuccessMessageDeny] = useState('')
  const [successMessageAccept, setSuccessMessageAccept] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const filteredFeatures = Array.isArray(features)
    ? features.filter((feature) => feature.boardId === customBoardId)
    : features && typeof features === 'object'
    ? Object.values(features).filter((feature) => feature.boardId === customBoardId)
    : []

  const newFeatures = Array.isArray(filteredFeatures)
    ? filteredFeatures.filter((feature) => feature.type === 'newFeature')
    : []

  const handleAcceptFeature = async (id, type) => {
    const { success, data, error } = await acceptFeature(id, type, 'AdminNewFeature')

    if (success) {
      setSuccessMessageAccept(strings.successMessages.featureAccepted)
    } else {
      //console.error(strings.errorMessages.error, error)
      setErrorMessage(strings.errorMessages.error)
    }
  }

  const handleDenyFeature = async (id, type) => {
    const { success, data, error } = await denyFeature(id, type, 'AdminNewFeature')

    if (success) {
      setSuccessMessageDeny(strings.successMessages.featureDenied)
    } else {
      //console.error(strings.errorMessages.error, error)
      setErrorMessage(strings.errorMessages.error)
    }
  }

  return (
    <div>
      <section className="pb-10 mb-10 pt-16 mt-[6.5rem] lg:w-[400px] rounded-xl p-6 bg-[#FFFDE7] lg:max-h-[450px] h-[600px] overflow-y-auto lg:overflow-visible lg:relative">
        <div className="lg:max-h-[370px] overflow-y-auto">
          <div className="flex items-center justify-center absolute lg:top-[-35px] top-[290px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={lightIconBig} alt="Picture of the author" />
            <div className="badge badge-md w-[70px] bg-[#F57F17] border-[#F57F17] absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 text-xs text-neutral">
              {strings.featureSpecific.new}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {newFeatures ? (
              (() => {
                return newFeatures.length > 0 ? (
                  newFeatures.map((newFeature) => (
                    <div
                      key={newFeature.id}
                      className="bg-neutral pr-5 pl-5 pt-4 pb-3 w-full lg:w-auto rounded-xl shadow flex-col">
                      <div className="flex grow">
                        <div className="flex flex-row justify-between items-center w-full">
                          <p className="pb-1 font-medium text-sm md:text-sm lg:text-sm">
                            {newFeature.title}
                          </p>
                          <div className="badge badge-sm w-[55px] bg-[#F57F17] border-[#F57F17] ml-auto text-xs text-neutral">
                            {strings.featureSpecific.new}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] pr-2">{newFeature.description}</p>
                      </div>
                      <div className="flex flex-row justify-center pt-6 pb-2">
                        <button
                          onClick={() => handleAcceptFeature(newFeature.id, newFeature.type)}
                          className="btn btn-xs mr-3 bg-[#C8E6C9] border-[#C8E6C9] text-black text-xs cursor-pointer">
                          {strings.featureSpecific.acceptFeature}
                        </button>
                        <button
                          onClick={() => handleDenyFeature(newFeature.id, newFeature.type)}
                          className="btn btn-xs bg-[#FFCCBC] border-[#FFCCBC] text-black text-xs cursor-pointer">
                          {strings.featureSpecific.denyFeature}
                        </button>
                      </div>
                      {newFeature.userName && (
                        <p className="text-[8px] text-right text-[#696868]">
                          {strings.featureSpecific.sentInUsername} {newFeature.userName}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">{strings.featureSpecific.noFeatures}</p>
                )
              })()
            ) : (
              <p className="text-center text-gray-500">{strings.featureSpecific.noFeatures}</p>
            )}
          </div>
        </div>
      </section>
      {successMessageDeny && (
        <Toast
          message={successMessageDeny}
          onClose={() => setSuccessMessageDeny('')}
          type="success"
        />
      )}
      {successMessageAccept && (
        <Toast
          message={successMessageAccept}
          onClose={() => setSuccessMessageAccept('')}
          type="success"
        />
      )}
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage('')} type="error" />
      )}
    </div>
  )
}

export default AdminNewFeature
