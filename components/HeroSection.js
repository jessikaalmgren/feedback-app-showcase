'use client'
import Link from 'next/link'
import { useContext } from 'react'
import strings from '@utils/strings'
import { BoardContext } from '@context/BoardContext'

const HeroSection = () => {
  const { boards } = useContext(BoardContext)

  return (
    <div>
      <div className="mx-auto flex justify-center p-10">
        <h2>{strings.homePage.welcomeMessage}</h2>
      </div>
      <section className="mx-auto flex justify-center">
        <div className="hero w-full">
          <div className="hero-content w-full">
            {/* Grid container för boards */}
            <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-8">
              {boards.length > 0 ? (
                boards.map((board) => (
                  <Link href={`board/${board.id}`} key={board.id}>
                    <div className="board-item mb-0 p-4 border border-gray-200 rounded-xl block w-full h-full">
                      <h4 className="text-lg font-medium pb-1">{board.title}</h4>
                      <p className="text-xs pb-2 text-blue-600">{board.category}</p>
                      <p className="text-sm pb-4">{board.description}</p>
                      {/* <p className="text-sm">Votes: {board.boardTotalVotes}</p> Coming as new feature */}
                    </div>
                  </Link>
                ))
              ) : (
                <p>{strings.informationMessages.loading}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
