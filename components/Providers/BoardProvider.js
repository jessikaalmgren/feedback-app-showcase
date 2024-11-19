'use client'

import { BoardContextProvider } from '@context/BoardContext'

export default function BoardProviders({ children }) {
  return <BoardContextProvider>{children}</BoardContextProvider>
}

// This file defines a `BoardProviders` component that wraps its children in the
// `BoardContextProvider`. It ensures that the board-related state and actions
// are available to all child components that need to interact with the board data.
