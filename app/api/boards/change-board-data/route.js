import { adminFirestore } from '@lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function PUT(request) {
  try {
    const data = await request.json()
    const { id, title, description, boardUrl } = data

    // Get the document from the database with help from ID
    const boardRef = adminFirestore.collection('boards').doc(id)
    const boardDoc = await boardRef.get()

    if (!boardDoc.exists) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 })
    }

    const boardData = boardDoc.data()

    // Create an update object to only update necessary fields
    const updateData = { title, description }

    // Check if boardUrl is unique and not already exists in the database
    if (!boardData.boardUrl && boardUrl) {
      const boardUrlQuery = await adminFirestore
        .collection('boards')
        .where('boardUrl', '==', boardUrl)
        .get()
      if (!boardUrlQuery.empty) {
        return NextResponse.json({ error: 'boardUrl already exists' }, { status: 400 })
      }
      updateData.boardUrl = boardUrl
    }

    // Update the document in Firestore
    await boardRef.update(updateData)

    // Get the updated document from the database
    const updatedDoc = await boardRef.get()
    const updatedBoard = {
      id: updatedDoc.id, // Include the ID from the updated document
      ...updatedDoc.data(),
    }

    // Return a response with the updated document
    return NextResponse.json(updatedBoard)
  } catch (error) {
    console.error('Error recording vote:', error)
    return NextResponse.json({ error: 'Failed to record vote' })
  }
}
