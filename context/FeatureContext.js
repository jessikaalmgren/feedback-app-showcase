import { createContext, useReducer, useState, useCallback } from 'react'

// CREATE FEATURE CONTEXT TO HANDLE FEATURE DATA AND ACTIONS
export const FeatureContext = createContext()

// DEFININF REDUCER FUNCTION FOR STATE MANAGEMENT
export const featureReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FEATURES':
      return { features: action.payload }
    case 'CREATE_FEATURE':
      return {
        features: [action.payload, ...(Array.isArray(state.features) ? state.features : [])],
      }
    case 'DELETE_FEATURE':
      return {
        features: state.features.filter((f) => f._id !== action.payload._id),
      }
    case 'UPDATE_FEATURE':
      return {
        features: state.features.map((feature) =>
          feature.id === action.payload.id ? { ...feature, ...action.payload } : feature
        ),
      }
    default:
      return state
  }
}

// LOGGER TO TRACK ACTIONS IN THE APP
const actionLogger = (actionType, component, endpoint, payload, error = null) => {
  //console.log(`[Action: ${actionType}]`)
  //console.log(` - Initiated by Component: ${component}`)
  //console.log(` - API Endpoint: ${endpoint}`)
  if (error) {
    //console.log(` - Error: ${error.message}`)
  } else {
    //console.log(` - Payload:`, payload)
  }
}

// FEATURE CONTEXT PROVIDER
export const FeatureContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(featureReducer, { features: [] })
  const [isFetched, setIsFetched] = useState(false)

  // FUNCTION GET FEATURES BASED ON BOARD ID
  const fetchFeaturesByBoardId = useCallback(async (boardId, component = 'Unknown Component') => {
    const endpoint = `/api/features/${boardId}`
    try {
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error('Failed to fetch data')
      const json = await response.json()
      actionLogger('SET_FEATURES', component, endpoint, json)
      dispatch({ type: 'SET_FEATURES', payload: json })
    } catch (error) {
      actionLogger('FETCH_FEATURES', component, endpoint, { boardId }, error)
      //console.error('Error fetching features:', error)
    }
  }, [])

  // --------------  NEW SECTION ---------------
  // FUNCTION TO ACCEPTFEATURE AND MOVE IT TO VOTING SECTION - HAPPENS IN NEWSECTION
  const acceptFeature = useCallback(async (id, type, component = 'Unknown Component') => {
    const endpoint = '/api/features/change-type-voting'
    const payload = { id, type }

    try {
      actionLogger('ACCEPT_FEATURE', component, endpoint, payload)
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to accept feature')

      const json = await response.json()
      dispatch({ type: 'UPDATE_FEATURE', payload: json })

      return { success: true, data: json }
    } catch (error) {
      actionLogger('ACCEPT_FEATURE', component, endpoint, payload, error)
      //console.error('Error accepting feature:', error)
      return { success: false, error: 'Something went wrong, please try again' }
    }
  }, [])

  // FUNCTION TO DENY A FEATURE FROM NEW SECTION
  const denyFeature = useCallback(async (id, type, component = 'Unknown Component') => {
    const endpoint = '/api/features/change-type-deny'
    const payload = { id, type }

    try {
      actionLogger('DENY_FEATURE', component, endpoint, payload)
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to deny feature')

      const json = await response.json()
      dispatch({ type: 'UPDATE_FEATURE', payload: json })

      return { success: true, data: json }
    } catch (error) {
      actionLogger('DENY_FEATURE', component, endpoint, payload, error)
      //console.error('Error denying feature:', error)
      return { success: false, error: 'Something went wrong, please try again' }
    }
  }, [])

  // --------------  IN VOTING SECTION ---------------
  // FUNCTION TO SET A VOTING FEATURE TO DROPPED
  const dropFeature = useCallback(
    async (featureId, selectedReason, selectedVisibility, component = 'Unknown Component') => {
      const endpoint = '/api/features/change-type-drop'
      const payload = {
        id: featureId,
        type: 'droppedFeature',
        reason: selectedReason,
        reasonShow: selectedVisibility,
      }

      try {
        actionLogger('DROP_FEATURE', component, endpoint, payload)
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error('Failed to update feature')

        const json = await response.json()
        dispatch({ type: 'UPDATE_FEATURE', payload: json })

        return { success: true, data: json }
      } catch (error) {
        actionLogger('DROP_FEATURE', component, endpoint, payload, error)
        //console.error('Error updating feature:', error)
        return { success: false, error: 'Something went wrong, please try again' }
      }
    },
    []
  )

  // FUNCTION TO UPDATE A VOTING FEATURE TO WON
  const updateWonFeature = useCallback(
    async (
      featureId,
      selectedStatus,
      selectedStatusVisibility,
      component = 'Unknown Component'
    ) => {
      const endpoint = '/api/features/change-type-won'
      const payload = {
        id: featureId,
        type: 'wonFeature',
        status: selectedStatus,
        statusShow: selectedStatusVisibility,
      }

      try {
        actionLogger('UPDATE_WON_FEATURE', component, endpoint, payload)
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error('Failed to update feature')

        const json = await response.json()
        dispatch({ type: 'UPDATE_FEATURE', payload: json })

        return { success: true, data: json }
      } catch (error) {
        actionLogger('UPDATE_WON_FEATURE', component, endpoint, payload, error)
        //console.error('Error updating feature:', error)
        return { success: false, error: 'Something went wrong, please try again' }
      }
    },
    []
  )

  // --------------  WON SECTION ---------------
  // FUNCTION TO UPDATE A WON FEATURES DETAILS
  const updateWonFeatureDetails = useCallback(
    async (featureId, changedStatusWon, changedVisibilityWon, component = 'Unknown Component') => {
      const endpoint = '/api/features/update-won-feature'
      const dataToUpdate = {}

      if (changedStatusWon !== '') {
        dataToUpdate.status = changedStatusWon
      }
      if (changedVisibilityWon !== '') {
        dataToUpdate.statusShow = changedVisibilityWon
      }

      const payload = { id: featureId, ...dataToUpdate }

      try {
        actionLogger('UPDATE_WON_FEATURE', component, endpoint, payload)
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to update feature')
        const json = await response.json()
        dispatch({ type: 'UPDATE_FEATURE', payload: json })

        return { success: true, data: json }
      } catch (error) {
        actionLogger('UPDATE_WON_FEATURE', component, endpoint, payload, error)
        //console.error('Error updating feature:', error)
        return { success: false, error: 'Something went wrong, please try again' }
      }
    },
    []
  )

  // FUNCTION UPDATE DROPPED FEATURE - CHANGE DROPPED FEATURE DETAILS
  const updateDroppedFeature = useCallback(
    async (
      featureId,
      changedStatusDropped,
      changedVisibilityDropped,
      component = 'Unknown Component'
    ) => {
      const endpoint = '/api/features/update-dropped-feature'
      const dataToUpdate = {}
      if (changedStatusDropped !== '') {
        dataToUpdate.reason = changedStatusDropped
      }
      if (changedVisibilityDropped !== '') {
        dataToUpdate.reasonShow = changedVisibilityDropped
      }
      const payload = { id: featureId, ...dataToUpdate }
      try {
        actionLogger('UPDATE_DROPPED_FEATURE', component, endpoint, payload)
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error('Failed to update feature')

        const json = await response.json()
        dispatch({ type: 'UPDATE_FEATURE', payload: json })
        return { success: true, data: json }
      } catch (error) {
        actionLogger('UPDATE_DROPPED_FEATURE', component, endpoint, payload, error)
        //console.error('Error updating dropped feature:', error)
        return { success: false, error: 'Something went wrong, please try again' }
      }
    },
    [dispatch]
  )

  // -------------- OTHERS ---------------------
  // FUNCTION CREATE A NEW FEATURE
  const createFeature = useCallback(async (featureData, component = 'Unknown Component') => {
    const endpoint = '/api/features/add-feature'

    try {
      actionLogger('SEND_FEATURE', component, endpoint, featureData)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(featureData),
      })

      if (!response.ok) throw new Error('Failed to send feature')

      const json = await response.json()
      dispatch({ type: 'CREATE_FEATURE', payload: json })
      return { success: true, data: json }
    } catch (error) {
      actionLogger('SEND_FEATURE', component, endpoint, featureData, error)
      //console.error('Error sending feature:', error)
      return { success: false, error: 'Something went wrong, please try again' }
    }
  }, [])

  // FUNCTION TO HANDLE VOTING ON FEATURES
  const voteOnFeature = useCallback(async (id, voteType, component = 'Unknown Component') => {
    const endpoint = '/api/features/vote'
    const payload = { id, voteType }

    try {
      actionLogger('VOTE_ON_FEATURE', component, endpoint, payload)
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to vote on feature')
      const json = await response.json()
      dispatch({ type: 'UPDATE_FEATURE', payload: json })
      return { success: true, data: json }
    } catch (error) {
      actionLogger('VOTE_ON_FEATURE', component, endpoint, payload, error)
      //console.error('Error voting on feature:', error)
      return { success: false, error: 'Something went wrong, please try again' }
    }
  }, [])

  // EXPOSE STATE, DISPATCH AND FETCH FUNCTIONS THROUGH CONTEXT PROVIDER
  return (
    <FeatureContext.Provider
      value={{
        ...state,
        fetchFeaturesByBoardId,
        voteOnFeature,
        updateDroppedFeature,
        acceptFeature,
        createFeature,
        denyFeature,
        updateWonFeature,
        dropFeature,
        updateWonFeatureDetails,
      }}>
      {children}
    </FeatureContext.Provider>
  )
}
