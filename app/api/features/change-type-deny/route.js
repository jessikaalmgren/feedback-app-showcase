import { adminFirestore } from '@lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function PUT(request) {
  try {
    const data = await request.json()

    const { id, type } = data

    // Get the document from the database with help of ID
    const featureRef = adminFirestore.collection('features').doc(id)
    await featureRef.update({ type: 'droppedFeature' })

    // Get the updated document from the database
    const updatedDoc = await featureRef.get()
    const updatedFeature = {
      id: updatedDoc.id, // Inlcude ID from the updated document
      ...updatedDoc.data(),
    }

    // Return a response with the updated document
    return NextResponse.json(updatedFeature)
  } catch (error) {
    console.error('Error recording vote:', error)
    return NextResponse.json({ error: 'Failed to record vote' })
  }
}
