import { adminFirestore } from '@lib/firebase-admin'
import { NextResponse } from 'next/server'

export async function PUT(request) {
  try {
    const data = await request.json()

    const { id, voteType } = data

    // Get the document from the database with help from ID
    const featureRef = adminFirestore.collection('features').doc(id)
    const doc = await featureRef.get()

    if (!doc.exists) {
      return NextResponse.json({ error: 'Feature not found' })
    }

    // Update totalVotes depending on voteType
    let updatedVotes
    if (voteType === 'upvote') {
      updatedVotes = doc.data().totalVotes + 1
    } else if (voteType === 'downvote') {
      updatedVotes = doc.data().totalVotes - 1
    } else {
      return NextResponse.json({ error: 'Invalid vote type' })
    }

    // Update the database with the new amount of totalVotes
    await featureRef.update({ totalVotes: updatedVotes })

    // Get the updated document from the database
    const updatedDoc = await featureRef.get()
    const updatedFeature = {
      id: updatedDoc.id, // Include ID from the updated document
      ...updatedDoc.data(),
    }
    // Return a response with the updated document
    return NextResponse.json(updatedFeature)
  } catch (error) {
    console.error('Error recording vote:', error)
    return NextResponse.json({ error: 'Failed to record vote' })
  }
}
