import { createContext, useReducer, useEffect, useCallback, useState } from 'react'

// CREATING THE BOARDCONTEXT TO HANDLE BOARD DATA AND ACTIONS
export const BoardContext = createContext()

// DEFINING REDUCER FUNCTION FOR STATE MANAGEMENT
export const boardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return { boards: action.payload }

    case 'CREATE_BOARD':
      return { boards: [action.payload, ...state.boards] }

    case 'DELETE_BOARD':
      return {
        boards: state.boards.filter((w) => w._id !== action.payload._id),
      }

    case 'UPDATE_BOARD':
      return {
        boards: state.boards.map((board) =>
          board.id === action.payload.id
            ? {
                ...board,
                title: action.payload.title,
                description: action.payload.description,
                boardUrl: action.payload.boardUrl,
              }
            : board
        ),
      }

    default:
      return state
  }
}

// LOGGER TO KEEP TRACK OF ACTIONS BEING EXECUTED
const actionLogger = (actionType, component, endpoint, payload, error = null) => {
  console.log(`[Action: ${actionType}]`)
  console.log(` - Initiated by Component: ${component}`)
  console.log(` - API Endpoint: ${endpoint}`)
  if (error) {
    console.log(` - Error: ${error.message}`)
  } else {
    console.log(` - Payload:`, payload)
  }
}

export const BoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, {
    boards: [], // Initial state
  })
  const [isFetched, setIsFetched] = useState(false)

  // FUNCTION GET ALL BOARDS
  const fetchBoards = useCallback(async (component = 'Unknown Component') => {
    const endpoint = '/api/boards'

    try {
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error('Failed to fetch boards')
      const json = await response.json()
      actionLogger('SET_BOARD', component, endpoint, json)
      dispatch({ type: 'SET_BOARD', payload: json })
      setIsFetched(true)
    } catch (error) {
      actionLogger('FETCH_BOARDS', component, endpoint, {}, error)
      console.error('Error fetching boards:', error)
    }
  }, [])

  // FUNCTION GET BOARD BY CUSTOMBOARDID
  const fetchBoardByUrl = useCallback(async (customBoardUrl, component = 'Unknown Component') => {
    const endpoint = `/api/boards/${customBoardUrl}`
    try {
      actionLogger('FETCH_BOARD_BY_URL', component, endpoint, { customBoardUrl })
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error(`Failed to fetch board ${customBoardUrl}`)
      const json = await response.json()
      dispatch({ type: 'SET_BOARD', payload: [json] })
      actionLogger('SET_BOARD', component, endpoint, json)
    } catch (error) {
      actionLogger('FETCH_BOARD_BY_URL', component, endpoint, { customBoardUrl }, error)
      console.error('Error fetching board data:', error)
    }
  }, [])

  // FUNCTION UPDATE A BOARD
  const handleUpdateBoard = useCallback(async (boardData, component = 'Unknown Component') => {
    const { id, title, description, boardUrl } = boardData
    const endpoint = '/api/boards/change-board-data'
    const payload = { id, title, description, boardUrl }

    try {
      actionLogger('UPDATE_BOARD', component, endpoint, payload)
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Failed to update board')
      const json = await response.json()
      dispatch({ type: 'UPDATE_BOARD', payload: json })
    } catch (error) {
      actionLogger('UPDATE_BOARD', component, endpoint, payload, error)
    }
  }, [])

  // INITIATE FETCH WHEN BOARDCONTEXT IS MOUNTED, BUT AVOID DOING IT MORE THAN ONCE
  useEffect(() => {
    if (!isFetched) {
      fetchBoards('BoardContext')
    }
  }, [isFetched]) // Will only trigger if isFetched is false

  // EXPOSE STATE, DISPATCH AND FETCH FUNCTIONS THROUGH CONTEXT PROVIDER
  return (
    <BoardContext.Provider
      value={{
        ...state,
        fetchBoardByUrl,
        handleUpdateBoard,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
