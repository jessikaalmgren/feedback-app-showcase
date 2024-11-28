'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import BoardSettings from './BoardSettings'
import AdminNewFeature from './AdminNewFeature'
import AdminWonFeature from './AdminWonFeature'
import wonIcon from '@public/icons/wonicon.svg'
import lightIcon from '@public/icons/lighticon.svg'
import { BoardContext } from '@context/BoardContext'
import votingIcon from '@public/icons/votingicon.svg'
import AdminVotingFeature from './AdminVotingFeature'
import AdminDroppedFeature from './AdminDroppedFeature'
import droppedIcon from '@public/icons/droppedicon.svg'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState, useEffect, useContext } from 'react'
import { FeatureContext } from '@context/FeatureContext'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const ExplorePage = () => {
  const { boards } = useContext(BoardContext)
  const [activeTab, setActiveTab] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('New')
  const [selectedModalFeature, setSelectedModalFeature] = useState(null)
  const { features, fetchFeaturesByBoardId } = useContext(FeatureContext)

  const router = useRouter()
  const { customBoardId } = useParams()

  // Hämta parameter från URL
  const params = useParams()

  // Hitta rätt board från boards arrayen baserat på boardId
  const boardData = boards.find((board) => board.id === customBoardId)

  const [tempTitle, setTempTitle] = useState(boardData.title)
  const [tempDescription, setTempDescription] = useState(boardData.description)

  //BoardData innehåller den aktiva boarden vi behöver för att använda den runt om i denna komponent.

  useEffect(() => {
    if (boardData?.id) {
      fetchFeaturesByBoardId(boardData.id, 'FeatureComponent') // Hämta features för det specifika boardId
    }
  }, [boardData?.id, fetchFeaturesByBoardId]) // Anropa funktionen när boardData.id ändras

  useEffect(() => {
    setTempTitle(boardData.title)
  }, [boardData.title])

  useEffect(() => {
    setTempDescription(boardData.title)
  }, [boardData.description])

  const openModal = (modalId, feature) => {
    document.getElementById(modalId).showModal()
    setSelectedModalFeature(feature)
    setTempTitle(boardData.title)
    setTempDescription(boardData.description)
    // Här kan du använda featureId för att utföra åtgärder för den specifika featuren
  }

  const closeModal = (modalId) => {
    document.getElementById(modalId).close()
  }

  const handleTitleChange = (e) => {
    setTempTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setTempDescription(e.target.value)
  }

  // Funktion för att uppdatera det valda komponenten baserat på vilken knapp som klickas
  const handleButtonClick = (componentName) => {
    // Uppdatera tillståndet för vald komponent
    setSelectedComponent(componentName)
  }

  const handleTabClick = (index) => {
    setActiveTab(index) // Uppdatera den aktiva fliken när en tabb klickas på
  }

  const handleUpdateBoard = async () => {
    try {
      const data = {
        id: boardData.boardId,
        title: tempTitle,
        description: tempDescription,
        boardUrl: customBoardId,
      }

      const response = await fetch('/api/boards/change-board-data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'UPDATE_BOARD', payload: json })
        // Funktionen uppdaterades framgångsrikt
        // Uppdatera state eller gör andra åtgärder efter behov
      } else {
        // Hantera felmeddelande
      }
    } catch (error) {
      //console.error('Error sending board data update', error)
      // Hantera fel
    }

    router.push(`/${customBoardId}`)
  }

  const goToOwnUrlPage = () => {
    window.open(`/${boardData.boardUrl}`, '_blank')
    // router.push(`/${boardData.boardUrl}`)
  }

  return (
    <div>
      <div>
        <div className="lg:relative lg:top-8 lg:left-[250px] pl-8 pt-4">
          <Link href="/">
            {' '}
            <button className="pt-2 pb-2 pl-4 pr-4 border-2 rounded-xl hover:bg-neutral-50 text-sm">
              Home
            </button>
          </Link>
        </div>
        <div className="p-8 pt-6 m-6 rounded-xl mx-auto w-[500px]">
          <div>
            <div className="hidden lg:block">
              <div className="flex justify-center p-6">
                <div className="rounded-lg shadow-xl">
                  <div className="bg-neutral rounded-xl p-2 border-2 border-base-300">
                    <div className="grid grid-cols-[250px_750px]">
                      <div className="bg-neutral p-4 flex flex-col place-items-start text-sm h-[600px] border-r-[2px] border-base-200 mt-2">
                        <button
                          className={`p-2 mb-1 w-full rounded-md cursor-pointer flex flex-row gap-2 ${
                            selectedComponent === 'New' ? 'bg-base-200' : 'hover:bg-base-200'
                          }`}
                          onClick={() => handleButtonClick('New')}>
                          <Image src={lightIcon} alt="Picture of the author" />
                          <p className="text-sm">New</p>
                          <div className="flex place-self-end">
                            <span className="indicator-item badge">
                              {features &&
                              Object.values(features).filter(
                                (feature) => feature.type === 'newFeature'
                              ).length > 0
                                ? Object.values(features).filter(
                                    (feature) => feature.type === 'newFeature'
                                  ).length
                                : '0'}
                            </span>
                          </div>
                        </button>
                        <button
                          className={`p-2 mb-1 w-full rounded-md cursor-pointer flex flex-row gap-2 ${
                            selectedComponent === 'In voting' ? 'bg-base-200' : 'hover:bg-base-200'
                          }`}
                          onClick={() => handleButtonClick('In voting')}>
                          <Image src={votingIcon} alt="Picture of the author" />
                          <p className="text-sm">In voting</p>
                        </button>
                        <button
                          className={`p-2 mb-1 w-full rounded-md cursor-pointer flex flex-row gap-2 ${
                            selectedComponent === 'Won' ? 'bg-base-200' : 'hover:bg-base-200'
                          }`}
                          onClick={() => handleButtonClick('Won')}>
                          <Image src={wonIcon} alt="Picture of the author" />
                          <p className="text-sm">Won</p>
                        </button>
                        <button
                          className={`p-2 mb-1 w-full rounded-md cursor-pointer flex flex-row gap-2 ${
                            selectedComponent === 'Dropped' ? 'bg-base-200' : 'hover:bg-base-200'
                          }`}
                          onClick={() => handleButtonClick('Dropped')}>
                          <Image src={droppedIcon} alt="Picture of the author" />
                          <p className="text-sm">Dropped</p>
                        </button>
                        <button
                          className={`p-2 mb-1 w-full rounded-md cursor-pointer flex flex-row gap-2 ${
                            selectedComponent === 'Board settings'
                              ? 'bg-base-200'
                              : 'hover:bg-base-200'
                          }`}
                          onClick={() => handleButtonClick('Board settings')}>
                          <SettingsIcon
                            sx={{ fontSize: '18px', marginRight: '1px', color: '#939393' }}
                          />
                          <p className="text-sm">Board settings</p>
                        </button>

                        <Link href={`board/${boardData.id}`} key={boardData.id} className="w-full">
                          <button
                            className={`p-2 mb-1 w-full rounded-md cursor-pointer flex flex-row gap-2 ${
                              selectedComponent === 'Preview board'
                                ? 'bg-base-200'
                                : 'hover:bg-base-200'
                            }`}
                            onClick={() => handleButtonClick('Preview board')}>
                            <OpenInNewIcon
                              sx={{ fontSize: '18px', marginRight: '1px', color: '#939393' }}
                            />
                            <p className="text-sm">View board</p>
                          </button>
                        </Link>
                      </div>
                      <div className="bg-neutral p-5">
                        {/* Rendera den valda komponenten i "Component section" */}
                        <div className="flex justify-center">
                          {selectedComponent === 'New' && <AdminNewFeature />}
                          {selectedComponent === 'In voting' && <AdminVotingFeature />}
                          {selectedComponent === 'Won' && <AdminWonFeature />}
                          {selectedComponent === 'Dropped' && <AdminDroppedFeature />}
                        </div>
                        <div className="flex justify-start">
                          {selectedComponent === 'Board settings' && <BoardSettings />}
                          {selectedComponent === 'Preview board' && <p>preview board</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detta block visar board settings i mobilläge - bör flyttas om det går till BoardSetings komponenten */}
            <div className="block lg:hidden">
              <div className="flex flex-row justify-between pb-4">
                <div className="flex flex-row">
                  <button
                    className="bg-neutral tabs-boxed p-2 w-[200px] text-xs hover:bg-neutral-content"
                    onClick={() => openModal('my_modal_1', boardData)}>
                    <SettingsIcon sx={{ fontSize: '15px', marginRight: '4px', color: '#939393' }} />
                    Board settings
                  </button>
                  <div>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="flex flex-row">
                          <h3 className="font-bold text-lg pb-2 pr-2">Board settings</h3>
                        </div>
                        <p>The title and description is displayed on your board.</p>
                        <p className="text-sm pt-6 pb-2 font-bold">Board title</p>
                        {boardData && (
                          <div className="text-xs">
                            <p className="w-full max-w-xs text-sm">{boardData.title}</p>
                          </div>
                        )}

                        <p className="text-sm pt-6 pb-2 font-bold">Board description</p>
                        {boardData && (
                          <div className="text-xs">
                            <p className=" w-full max-w-xs text-sm">{boardData.description}</p>
                          </div>
                        )}
                      </div>
                    </dialog>
                  </div>
                </div>
                <div className="">
                  <Link href={`board/${boardData.id}`} key={boardData.id} className="w-full">
                    <button className="bg-neutral tabs-boxed p-2 w-[200px] text-xs hover:bg-neutral-content">
                      <OpenInNewIcon
                        sx={{ fontSize: '15px', marginRight: '4px', color: '#939393' }}
                      />
                      Preview Board
                    </button>
                  </Link>
                </div>
              </div>
              <div className="tabs">
                <div className="tabs tabs-boxed bg-neutral mb-4" role="tablist">
                  {/* Rendera varje flik med en knapp */}
                  <button
                    role="tab"
                    className={`tab text-xs indicator w-auto ${
                      activeTab === 0 ? 'bg-neutral-content' : ''
                    }`}
                    onClick={() => handleTabClick(0)}>
                    <div className="flex flex-row items-center justify-around">
                      <Image src={lightIcon} alt="Picture of the author" />
                      <p className="text-xs pl-1">New</p>
                    </div>
                    <span className="indicator-item badge">
                      {features &&
                      Object.values(features).filter((feature) => feature.type === 'newFeature')
                        .length > 0
                        ? Object.values(features).filter((feature) => feature.type === 'newFeature')
                            .length
                        : '0'}
                    </span>
                  </button>
                  <button
                    role="tab"
                    className={`tab text-xs ${activeTab === 1 ? 'bg-neutral-content' : ''}`}
                    onClick={() => handleTabClick(1)}>
                    <div className="flex flex-row items-center justify-around">
                      <Image src={votingIcon} alt="Picture of the author" />
                      <p className="text-xs pl-1">Voting</p>
                    </div>
                  </button>
                  <button
                    role="tab"
                    className={`tab text-xs ${activeTab === 2 ? 'bg-neutral-content' : ''}`}
                    onClick={() => handleTabClick(2)}>
                    <div className="flex flex-row items-center justify-around">
                      <Image src={wonIcon} alt="Picture of the author" />
                      <p className="text-xs pl-1">Won</p>
                    </div>
                  </button>
                  <button
                    role="tab"
                    className={`tab text-xs ${activeTab === 3 ? 'bg-neutral-content' : ''}`}
                    onClick={() => handleTabClick(3)}>
                    <div className="flex flex-row items-center justify-around">
                      <Image src={droppedIcon} alt="Picture of the author" />
                      <p className="text-xs pl-1">Dropped</p>
                    </div>
                  </button>
                </div>

                {activeTab === 0 && <AdminNewFeature features={features} />}
                {activeTab === 1 && <AdminVotingFeature features={features} />}
                {activeTab === 2 && <AdminWonFeature features={features} />}
                {activeTab === 3 && <AdminDroppedFeature features={features} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
