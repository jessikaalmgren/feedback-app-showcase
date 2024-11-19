import { adminFirestore } from '@lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function PUT(request) {
  try {
    const data = await request.json()

    const { id, type, status, statusShow } = data

    // Get the document from the database with help from ID
    const featureRef = adminFirestore.collection('features').doc(id)
    await featureRef.update(data)

    // Get the updated document from the database
    const updatedDoc = await featureRef.get()
    const updatedFeature = {
      id: updatedDoc.id, // Include the ID from the updated document
      ...updatedDoc.data(),
    }

    // Return a response with the updated document
    return NextResponse.json(updatedFeature)
  } catch (error) {
    //console.error('Error recording vote:', error)
    return NextResponse.json({ error: 'Failed to record vote' })
  }
}
