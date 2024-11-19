import { adminFirestore } from '@lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function GET(request, context) {
  const { boardId } = context.params

  try {
    // Get documents that match boardId
    const featureSnapshot = await adminFirestore
      .collection('features')
      .where('boardId', '==', boardId)
      .get()

    if (featureSnapshot.empty) {
      return NextResponse.json({ error: 'No features found for this board' })
    }

    // Convert results into array
    const features = featureSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Return the received documents
    return NextResponse.json(features)
  } catch (error) {
    //console.error('Error fetching features:', error)
    return NextResponse.json({ error: 'Failed to fetch features' })
  }
}
