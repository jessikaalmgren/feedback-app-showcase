import Image from 'next/image'
import { useState } from 'react'
import { useContext } from 'react'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import EditIcon from '@mui/icons-material/Edit'
import wonIconBig from '@public/icons/wonicon_big.svg'
import { FeatureContext } from '@context/FeatureContext'

const AdminWonFeature = () => {
  const { customBoardId } = useParams()
  const [changedStatusWon, setChangedStatusWon] = useState('')
  const [visibilityOption, setVisibilityOption] = useState('')
  const [changedVisibilityWon, setChangedVisibilityWon] = useState('')
  const [selectedModalFeature, setSelectedModalFeature] = useState(null)
  const { features, updateWonFeatureDetails } = useContext(FeatureContext)

  const filteredFeatures = Array.isArray(features)
    ? features.filter((feature) => feature.boardId === customBoardId)
    : features && typeof features === 'object'
    ? Object.values(features).filter((feature) => feature.boardId === customBoardId)
    : []

  const wonFeatures = Array.isArray(filteredFeatures)
    ? filteredFeatures.filter((feature) => feature.type === 'wonFeature')
    : []

  const openModal = (modalId, feature) => {
    document.getElementById(modalId).showModal()
    setSelectedModalFeature(feature)
  }

  const closeModal = (modalId) => {
    document.getElementById(modalId).close()
  }

  const handleUpdateWonFeature = async (
    modalId,
    featureId,
    changedStatusWon,
    changedVisibilityWon
  ) => {
    const { success, data, error } = await updateWonFeatureDetails(
      featureId,
      changedStatusWon,
      changedVisibilityWon,
      'AdminWonFeature'
    )

    if (success) {
      setChangedStatusWon('')
      setVisibilityOption('')
      closeModal(modalId)
    } else {
      console.error(strings.errorMessages.error, error)
    }
  }

  return (
    <div>
      <section className="pb-10 mb-10 pt-16 mt-[6.5rem] lg:pt-16 lg:w-[400px] lg:flex-grow rounded-xl p-6 bg-[#E8F5E9] lg:max-h-[450px] h-[600px] overflow-y-auto lg:overflow-visible lg:relative">
        <div className="lg:max-h-[370px] overflow-y-auto">
          <div className="flex items-center justify-center absolute lg:top-[-35px] top-[290px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={wonIconBig} alt="Picture of the author" />
            <div className="badge badge-md w-[70px] bg-[#1B5E20] border-[#1B5E20] absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 text-xs text-neutral">
              {strings.featureSpecific.won}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {wonFeatures ? (
              (() => {
                return wonFeatures.length > 0 ? (
                  wonFeatures.map((wonFeature) => (
                    <div
                      key={wonFeature.id}
                      className="bg-neutral p-4 w-full lg:w-auto rounded-xl flex-col shadow">
                      <div className="flx grow">
                        <div className="flex flex-row justify-between items-center align-baseline">
                          <p className="text-sm pb-1 font-medium md:text-sm lg:text-sm">
                            {wonFeature.title}
                          </p>
                          <div className="flex items-start">
                            <div className="mb-2 badge badge-sm w-[80px] h-[25px] border-[#1B5E20] text-xs mr-2 text-[#1B5E20]">
                              {strings.featureSpecific.numberOfVotes} {wonFeature.totalVotes}
                            </div>
                          </div>
                        </div>

                        <p className="text-[10px] pr-2">{wonFeature.description}</p>
                      </div>
                      <div className="divider"></div>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center">
                          <p className="text-xs font-semibold">{strings.featureSpecific.status}</p>
                          <p className="text-xs pl-1">{wonFeature.status}</p>
                        </div>
                        <div className="items-center ml-auto">
                          <button
                            className="flex flex-row"
                            onClick={() => openModal('my_modal_5', wonFeature)}>
                            <p className="text-xs pr-1">{strings.featureSpecific.edit}</p>
                            <div className="text-[8px]">
                              <EditIcon sx={{ fontSize: '16px', color: '#1B5E20' }} />
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-row items-center pt-2">
                        <p className="text-xs pr-2 font-semibold">
                          {strings.featureSpecific.statusVisibility}
                        </p>

                        <p
                          className={`text-xs rounded-xl pl-2 pr-2 pt-1 pb-1 ${
                            wonFeature.statusShow ? 'bg-[#E8F5E9]' : 'bg-gray-100 border-gray-300'
                          }`}>
                          {wonFeature.statusShow ? 'Yes' : 'No'}
                        </p>
                      </div>
                      {wonFeature.userName && (
                        <p className="text-[8px] text-right pt-0 text-[#696868]">
                          {strings.featureSpecific.sentInUsername} {wonFeature.userName}
                        </p>
                      )}
                      <div>
                        <dialog id="my_modal_5" className="modal">
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
                              {strings.featureSpecific.changeStatus}
                            </p>
                            <select
                              className="select select-bordered w-full max-w-xs text-xs mb-6"
                              value={changedStatusWon}
                              onChange={(e) => {
                                setChangedStatusWon(e.target.value)
                              }}>
                              <option value="" disabled={true}>
                                {strings.featureSpecific.selectAnoterStatus}
                              </option>
                              <option>{strings.featureSpecific.status1}</option>
                              <option>{strings.featureSpecific.status2}</option>
                              <option>{strings.featureSpecific.status3}</option>
                            </select>
                            <div>
                              <p className="text-xs pr-2 pb-2">
                                {strings.featureSpecific.changeStatusVisibility}
                              </p>
                              <select
                                className="select select-bordered w-full max-w-xs text-xs mb-6"
                                value={visibilityOption}
                                onChange={(e) => {
                                  const newValue = e.target.value === 'Visible to users'
                                  setVisibilityOption(e.target.value)
                                  setChangedVisibilityWon(newValue)
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
                                  handleUpdateWonFeature(
                                    'my_modal_5',
                                    selectedModalFeature.id,
                                    changedStatusWon,
                                    changedVisibilityWon
                                  )
                                }
                                className="btn">
                                {strings.buttons.save}
                              </button>
                            </div>
                          </div>
                        </dialog>
                      </div>
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
    </div>
  )
}

export default AdminWonFeature
