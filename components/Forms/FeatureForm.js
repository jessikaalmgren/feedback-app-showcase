'use client'
import { useState } from 'react'
import { useContext } from 'react'
import strings from '@utils/strings'
import { useParams } from 'next/navigation'
import Toast from '@components/Toasts/Toast'
import { BoardContext } from '@context/BoardContext'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { FeatureContext } from '@context/FeatureContext'

const FeatureForm = () => {
  const { boardId } = useParams()
  const [title, setTitle] = useState('')
  const { boards } = useContext(BoardContext)
  const [userName, setUserName] = useState('')
  const [description, setDescription] = useState('')
  const { createFeature } = useContext(FeatureContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const board = boards.find((board) => board.id === boardId)

  const handleSendFeature = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    const featureData = { title, description, userName, boardId }

    const { success, data, error } = await createFeature(featureData, 'FeatureForm')

    if (success) {
      setTitle('')
      setDescription('')
      setUserName('')
      setSuccessMessage(strings.successMessages.featureSentInSuccess)

      document.getElementById('my_modal_1').close()
    } else {
      setErrorMessage(strings.errorMessages.featureSuggestionFailed)
    }
  }

  const formatText = (text) => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  return (
    <div className="">
      <div
        className="font-normal text-xs"
        onClick={() => document.getElementById('my_modal_1').showModal()}>
        <div className="text-xs flex flex-row items-center">
          <div className="pr-2 text-[#311B92]">
            <PostAddIcon />
          </div>
          {strings.suggestFeatureForm.header}
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h2 className="font-bold text-center pt-4 pb-2">{strings.suggestFeatureForm.header}</h2>

          <p className="py-2 text-xs flex items-center justify-center">
            {strings.suggestFeatureForm.description}
          </p>

          <div className="flex justify-center items-center h-full">
            <form className="pt-2">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">{strings.suggestFeatureForm.header1}</span>
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(formatText(e.target.value))}
                  type="text"
                  placeholder={strings.suggestFeatureForm.placeholder}
                  className="input input-bordered w-[300px] text-sm"
                  required
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-[300px]">
                <div className="label">
                  <span className="label-text">{strings.suggestFeatureForm.header2}</span>
                </div>
                <input
                  value={description}
                  onChange={(e) => setDescription(formatText(e.target.value))}
                  type="text"
                  placeholder={strings.suggestFeatureForm.placeholder}
                  className="input input-bordered w-[300px] text-sm"
                  required
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-[300px]">
                <div className="label">
                  <span className="label-text">{strings.suggestFeatureForm.header3}</span>
                </div>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder={strings.suggestFeatureForm.placeholder}
                  className="input input-bordered w-full max-w-xs text-sm"
                />
                <div className="label">
                  <span className="label-text-alt italic text-[11px]">
                    {strings.suggestFeatureForm.usernameOptional}
                  </span>
                </div>
              </label>
            </form>
          </div>
          <div className="modal-action flex justify-center">
            <button type="submit" onClick={handleSendFeature} className="btn">
              {strings.buttons.sendIn}
            </button>
            <form method="dialog">
              <button className="btn">{strings.buttons.close}</button>
            </form>
          </div>
        </div>
      </dialog>

      {successMessage && (
        <Toast message={successMessage} onClose={() => setSuccessMessage('')} type="success" />
      )}

      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage('')} type="error" />
      )}
    </div>
  )
}

export default FeatureForm
