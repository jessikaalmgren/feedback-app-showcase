import { adminFirestore } from '@lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get all boards from Firestore
    const boardsRef = adminFirestore.collection('boards')
    const boardsSnapshot = await boardsRef.get()

    if (boardsSnapshot.empty) {
      return NextResponse.json({ error: 'No boards found' })
    }

    // Create a new array to store the boards and their features
    const boardsData = []

    // Iterate over each board and get their features
    for (const boardDoc of boardsSnapshot.docs) {
      const boardId = boardDoc.id
      const boardData = { id: boardId, ...boardDoc.data() }

      // Get all features that belongs to specific board
      const featuresRef = adminFirestore.collection('features')
      const featuresQuery = await featuresRef.where('boardId', '==', boardId).get()

      // Extract features-data
      const featuresData = featuresQuery.docs.map((featureDoc) => ({
        id: featureDoc.id,
        ...featureDoc.data(),
      }))

      // Add features to the respective board
      boardsData.push({ ...boardData, features: featuresData })
    }

    // Return all boards with their features as JSON
    return NextResponse.json(boardsData)
  } catch (error) {
    //console.error('Error fetching boards:', error)
    return NextResponse.json({ error: error.message })
  }
}
