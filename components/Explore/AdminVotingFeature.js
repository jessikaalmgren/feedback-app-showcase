import Image from 'next/image'
import { useState } from 'react'
import { useContext } from 'react'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import Toast from '@components/Toasts/Toast'
import { FeatureContext } from '@context/FeatureContext'
import votingIconBig from '@public/icons/votingicon_big.svg'

const AdminVotingFeature = () => {
  const { customBoardId } = useParams()
  const [isChecked, setIsChecked] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [sucessMessageWon, setSucessMessageWon] = useState('')
  const [sucessMessageDropped, setSucessMessageDropped] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedVisibility, setSelectedVisibility] = useState('')
  const [selectedModalFeature, setSelectedModalFeature] = useState(null)
  const [selectedStatusVisibility, setSelectedStatusVisibility] = useState('')
  const { features, updateWonFeature, dropFeature } = useContext(FeatureContext)

  const filteredFeatures = Array.isArray(features)
    ? features.filter((feature) => feature.boardId === customBoardId)
    : features && typeof features === 'object'
    ? Object.values(features).filter((feature) => feature.boardId === customBoardId)
    : []

  const votingFeatures = Array.isArray(filteredFeatures)
    ? filteredFeatures.filter((feature) => feature.type === 'votingFeature')
    : []

  const openModal = (modalId, feature) => {
    document.getElementById(modalId).showModal()
    setSelectedModalFeature(feature)
  }

  const closeModal = (modalId) => {
    document.getElementById(modalId).close()
  }

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const handleWonFeature = async (modalId, featureId, selectedStatus, selectedStatusVisibility) => {
    const { success, data, error } = await updateWonFeature(
      featureId,
      selectedStatus,
      selectedStatusVisibility,
      'AdminVotingFeature'
    )

    if (success) {
      closeModal(modalId)
      setSucessMessageWon(strings.successMessages.featureWon)
    } else {
      //console.error(strings.errorMessages.error, error)
      setErrorMessage(strings.errorMessages.error)
    }
  }

  const handleDropFeature = async (modalId, featureId, selectedReason, selectedVisibility) => {
    const { success, data, error } = await dropFeature(
      featureId,
      selectedReason,
      selectedVisibility,
      'AdminVotingFeature'
    )

    if (success) {
      closeModal(modalId)
      setSucessMessageDropped(strings.successMessages.featureDropped)
    } else {
      //console.error(strings.errorMessages.error, error)
      setErrorMessage(strings.errorMessages.error)
    }
  }

  return (
    <div>
      <section className="pb-10 mb-10 pt-16 mt-[6.5rem] lg:w-[400px] lg:pt-16 lg:flex-grow rounded-xl p-6 bg-[#EDE7F6] lg:max-h-[450px] h-[600px] overflow-y-auto lg:overflow-visible lg:relative">
        <div className="lg:max-h-[370px] overflow-y-auto">
          <div className="flex items-center justify-center absolute lg:top-[-35px] top-[290px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={votingIconBig} alt="Picture of the author" />
            <div className="badge badge-md w-[70px] bg-[#311B92] border-[#311B92] absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 text-xs text-neutral">
              {strings.featureSpecific.voting}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {votingFeatures ? (
              (() => {
                return votingFeatures.length > 0 ? (
                  votingFeatures.map((votingFeature) => (
                    <div
                      key={votingFeature.id}
                      className="bg-neutral pr-5 pl-5 pt-4 pb-3 w-full lg:w-auto rounded-xl flex-col shadow">
                      <div className="">
                        <div className="flex flex-row justify-between items-center align-baseline">
                          <p className="pb-1 text-sm font-medium md:text-sm lg:text-sm flex-grow">
                            {votingFeature.title}
                          </p>
                          <div className="flex items-start">
                            <div className="mb-2 badge badge-sm w-[80px] h-[25px] border-[#311B92] text-xs mr-2 text-[#311B92]">
                              {strings.featureSpecific.numberOfVotes} {votingFeature.totalVotes}
                            </div>
                          </div>
                        </div>

                        <p className="text-[10px] pr-2">{votingFeature.description}</p>
                        <div className="divider mb-2"></div>

                        <p className="text-sm text-center pb-2">
                          {strings.featureSpecific.chooseFaithOfFeature}
                        </p>

                        <div className="flex flex-row justify-center">
                          <button
                            onClick={() => openModal('my_modal_3', votingFeature)}
                            className="btn btn-xs text-xs font-normal mr-2 border-[#311B92] bg-neutral">
                            {strings.featureSpecific.dropFeature}
                          </button>
                          <button
                            onClick={() => openModal('my_modal_4', votingFeature)}
                            className="btn btn-xs text-xs font-normal bg-[#D1C4E9] border-[#D1C4E9]">
                            {strings.featureSpecific.declareWon}
                          </button>
                        </div>
                        {votingFeature.userName && (
                          <p className="text-[8px] text-right pt-5 pb-0 text-[#696868]">
                            {strings.featureSpecific.sentInUsername} {votingFeature.userName}
                          </p>
                        )}

                        {/* Modal for dropping feature */}
                        <div>
                          <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>
                              </form>
                              <div className="flex flex-row">
                                <h3 className="font-bold text-lg pb-2 pr-2">
                                  {strings.featureSpecific.dropTheFeature}
                                </h3>
                              </div>
                              <div role="alert" className="alert flex flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  className="stroke-current shrink-0 w-6 h-6">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span className="text-xs">
                                  {strings.featureSpecific.informationMovingToDroppedSection}
                                </span>
                              </div>
                              <p className="text-xs pt-6 pb-2">
                                {strings.featureSpecific.reasonToDrop}
                              </p>
                              <select
                                className="select select-bordered w-full max-w-xs text-xs mb-6"
                                value={selectedReason}
                                onChange={(e) => setSelectedReason(e.target.value)}>
                                <option value="" disabled={true}>
                                  {strings.featureSpecific.selectAReason}
                                </option>
                                <option>{strings.featureSpecific.reason1}</option>
                                <option>{strings.featureSpecific.reason2}</option>
                                <option>{strings.featureSpecific.reason3}</option>
                                <option>{strings.featureSpecific.reason4}</option>
                                <option>{strings.featureSpecific.reason5}</option>
                                <option>{strings.featureSpecific.reason6}</option>
                              </select>
                              <div className="flex flex-row items-center">
                                <p className="text-xs pr-2">
                                  {strings.featureSpecific.reasonVisible}
                                </p>
                                <input
                                  type="checkbox"
                                  value={selectedVisibility}
                                  onChange={(e) => setSelectedVisibility(e.target.checked)}
                                  className={`toggle ${
                                    isChecked
                                      ? 'bg-[#311B92] border-[#311B92] hover:bg-[#311B92]'
                                      : 'bg-gray-300 border-gray-300'
                                  }`}
                                  checked={isChecked}
                                  onClick={toggleCheckbox}
                                />
                              </div>
                              <div className="flex justify-center pt-6">
                                <button
                                  onClick={() =>
                                    handleDropFeature(
                                      'my_modal_3',
                                      votingFeature.id,
                                      selectedReason,
                                      selectedVisibility
                                    )
                                  }
                                  className="btn">
                                  {strings.buttons.save}
                                </button>
                              </div>
                            </div>
                          </dialog>
                        </div>

                        {/* Modal for declaring feature as won */}
                        <div>
                          <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>
                              </form>
                              <div className="flex flex-row">
                                <h3 className="font-bold text-lg">
                                  {strings.featureSpecific.declareWon}
                                </h3>
                              </div>
                              <div role="alert" className="alert flex flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  className="stroke-current shrink-0 w-6 h-6">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span className="text-xs">
                                  {strings.featureSpecific.informationMovingToWonSection}
                                </span>
                              </div>
                              <p className="text-xs pt-6 pb-2">
                                {strings.featureSpecific.addStatus}
                              </p>
                              <select
                                className="select select-bordered w-full max-w-xs text-xs mb-6"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}>
                                <option value="" disabled={true}>
                                  {strings.featureSpecific.selectStatus}
                                </option>
                                <option>{strings.featureSpecific.status1}</option>
                                <option>{strings.featureSpecific.status2}</option>
                                <option>{strings.featureSpecific.status3}</option>
                              </select>
                              <div className="flex flex-row items-center">
                                <p className="text-xs pr-2">
                                  {strings.featureSpecific.statusVisibility}
                                </p>
                                <input
                                  type="checkbox"
                                  value={selectedStatusVisibility}
                                  onChange={(e) => setSelectedStatusVisibility(e.target.checked)}
                                  className={`toggle ${
                                    isChecked
                                      ? 'bg-[#311B92] border-[#311B92] hover:bg-[#311B92]'
                                      : 'bg-gray-300 border-gray-300'
                                  }`}
                                  checked={isChecked}
                                  onClick={toggleCheckbox}
                                />
                              </div>
                              <div className="flex justify-center pt-6">
                                <button
                                  onClick={() =>
                                    handleWonFeature(
                                      'my_modal_4',
                                      votingFeature.id,
                                      selectedStatus,
                                      selectedStatusVisibility
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
                      <div className="flex flex-row justify-center pt-4"></div>
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
      {sucessMessageWon && (
        <Toast message={sucessMessageWon} onClose={() => setSucessMessageWon('')} type="success" />
      )}
      {sucessMessageDropped && (
        <Toast
          message={sucessMessageDropped}
          onClose={() => setSucessMessageDropped('')}
          type="success"
        />
      )}
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage('')} type="error" />
      )}
    </div>
  )
}

export default AdminVotingFeature
