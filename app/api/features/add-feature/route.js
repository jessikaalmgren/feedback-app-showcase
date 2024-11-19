import { adminFirestore } from '@lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()

    // Adding default values that are not already in the document
    const newData = {
      ...data,
      totalVotes: 0,
      type: 'newFeature',
      status: '',
      reason: '',
    }

    const { name, description, username, boardId } = data

    const featureRef = adminFirestore.collection('features').doc() // Generate a new ID automatically
    await featureRef.set(newData)

    // Get the updated document from the database
    const updatedDoc = await featureRef.get()
    const updatedFeature = {
      id: updatedDoc.id, // Include id from the updated document
      ...updatedDoc.data(),
    }

    return NextResponse.json(updatedFeature)
  } catch (error) {
    //console.error('Error recording vote:', error)
    return NextResponse.json({ error: 'Failed to record vote' })
  }
}
