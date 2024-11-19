import Image from 'next/image'
import { useState } from 'react'
import { useContext } from 'react'
import strings from '@utils/strings'
import EditIcon from '@mui/icons-material/Edit'
import { FeatureContext } from '@context/FeatureContext'
import droppedIconBig from '@public/icons/droppedicon_big.svg'

const AdminDroppedFeature = () => {
  const [changedStatusDropped, setChangedStatusDropped] = useState('')
  const [selectedModalFeature2, setSelectedModalFeature2] = useState(null)
  const [visibilityOptionDropped, setVisibilityOptionDropped] = useState('')
  const [changedVisibilityDropped, setChangedVisibilityDropped] = useState('')
  const [selectedModalFeature, setSelectedModalFeature] = useState(null)
  const { updateDroppedFeature } = useContext(FeatureContext)
  const { features } = useContext(FeatureContext)

  const droppedFeatures = Array.isArray(features)
    ? features.filter((feature) => feature.type === 'droppedFeature')
    : []

  const openModal = (modalId, feature) => {
    document.getElementById(modalId).showModal()
    setSelectedModalFeature(feature)
  }

  const closeModal = (modalId) => {
    document.getElementById(modalId).close()
  }

  const handleUpdateDroppedFeature = async (
    modalId,
    featureId,
    changedStatusDropped,
    changedVisibilityDropped
  ) => {
    const { success, data, error } = await updateDroppedFeature(
      featureId,
      changedStatusDropped,
      changedVisibilityDropped,
      'AdminDroppedFeature'
    )

    if (success) {
      setChangedStatusDropped('')
      setChangedVisibilityDropped('')
      closeModal(modalId)
    } else {
      //console.error(strings.errorMessages.error, error)
    }
  }

  return (
    <div>
      <section className="pb-10 mb-10 pt-16 mt-[6.5rem] lg:pt-16 lg:flex-grow lg:w-[400px] rounded-xl p-6 bg-[#FFCDD2] lg:max-h-[450px] h-[600px] overflow-y-auto lg:overflow-visible lg:relative">
        <div className="lg:max-h-[370px] overflow-y-auto">
          <div className="flex items-center justify-center absolute lg:top-[-35px] top-[290px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <Image src={droppedIconBig} alt="Picture of the author" />
            <div className="badge badge-md w-[70px] bg-[#B71C1C] border-[#B71C1C] absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 text-xs text-neutral">
              {strings.featureSpecific.dropped}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {droppedFeatures && droppedFeatures.length > 0 ? (
              droppedFeatures.filter((droppedFeature) => droppedFeature.type === 'droppedFeature')
                .length > 0 ? (
                features
                  .filter((droppedFeature) => droppedFeature.type === 'droppedFeature')
                  .map((droppedFeature) => (
                    <div
                      key={droppedFeature.id}
                      className="bg-neutral p-4 w-full lg:w-auto shadow rounded-xl flex-col">
                      <div className="">
                        <div className="flex flex-row justify-between items-center align-baseline">
                          <p className="text-sm pb-1 font-medium md:text-sm lg:text-sm">
                            {droppedFeature.title}
                          </p>
                          <div className="flex items-start">
                            <div className="mb-2 badge badge-sm w-[80px] h-[25px] border-[#B71C1C] text-xs mr-2 text-[#B71C1C]">
                              {strings.featureSpecific.numberOfVotes} {droppedFeature.totalVotes}
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] pr-2">{droppedFeature.description}</p>
                      </div>
                      <div className="divider"></div>
                      <div className="flex flex-row items-center">
                        <p className="text-xs font-semibold">{strings.featureSpecific.reason}</p>
                        <p className="text-xs pl-1">{droppedFeature.reason}</p>
                        <button
                          className="flex flex-row ml-auto"
                          onClick={() => openModal('my_modal_6', droppedFeature)}>
                          <p className="text-xs pr-1">{strings.featureSpecific.edit}</p>
                          <div className="text-[8px]">
                            <EditIcon sx={{ fontSize: '16px', color: '#B71C1C' }} />
                          </div>
                        </button>
                      </div>

                      <div className="flex flex-row items-center pt-2">
                        <p className="text-xs pr-2 font-semibold">
                          {strings.featureSpecific.reasonVisible}
                        </p>
                        <p
                          className={`text-xs rounded-xl pl-2 pr-2 pt-1 pb-1 ${
                            droppedFeature.reasonShow
                              ? 'bg-[#E8F5E9]'
                              : 'bg-gray-100 border-gray-300'
                          }`}>
                          {droppedFeature.reasonShow ? 'Yes' : 'No'}
                        </p>
                        <div className="flex flex-row items-center ml-auto pt-3">
                          <div className="flex ml-auto"></div>
                        </div>
                      </div>

                      <div>
                        <dialog id="my_modal_6" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <div className="flex flex-row">
                              {selectedModalFeature && selectedModalFeature.id && (
                                <h3 className="font-bold text-lg">
                                  {strings.featureSpecific.edit} {selectedModalFeature.title}
                                </h3>
                              )}
                            </div>
                            <p className="text-xs pt-6 pb-2">
                              {strings.featureSpecific.changeReason}
                            </p>
                            <select
                              className="select select-bordered w-full max-w-xs text-xs mb-6"
                              value={changedStatusDropped}
                              onChange={(e) => {
                                setChangedStatusDropped(e.target.value)
                              }}>
                              <option value="" disabled={true}>
                                {strings.featureSpecific.selectReason}
                              </option>
                              <option>{strings.featureSpecific.reason1}</option>
                              <option>{strings.featureSpecific.reason2}</option>
                              <option>{strings.featureSpecific.reason3}</option>
                              <option>{strings.featureSpecific.reason4}</option>
                              <option>{strings.featureSpecific.reason5}</option>
                              <option>{strings.featureSpecific.reason6}</option>
                            </select>
                            <div>
                              <p className="text-xs pr-2 pb-2">
                                {strings.featureSpecific.reasonVisibility}
                              </p>
                              <select
                                className="select select-bordered w-full max-w-xs text-xs mb-6"
                                value={visibilityOptionDropped}
                                onChange={(e) => {
                                  const newValue = e.target.value === 'Visible to users'
                                  setVisibilityOptionDropped(e.target.value)
                                  setChangedVisibilityDropped(newValue)
                                }}>
                                <option value="" disabled={true}>
                                  {strings.featureSpecific.selectVisiblity}
                                </option>
                                <option>{strings.featureSpecific.option1}</option>
                                <option>{strings.featureSpecific.option2}</option>
                              </select>
                            </div>
                            <div className="flex justify-center pt-6">
                              <button
                                onClick={() =>
                                  handleUpdateDroppedFeature(
                                    'my_modal_6',
                                    selectedModalFeature.id,
                                    changedStatusDropped,
                                    changedVisibilityDropped
                                  )
                                }
                                className="btn">
                                {strings.buttons.save}
                              </button>
                            </div>
                          </div>
                        </dialog>
                      </div>

                      {droppedFeature.userName && (
                        <p className="text-[8px] text-right pt-4 text-[#696868]">
                          {strings.featureSpecific.sentInUsername} {droppedFeature.userName}
                        </p>
                      )}
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

export default AdminDroppedFeature
