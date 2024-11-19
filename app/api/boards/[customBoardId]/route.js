import { NextResponse } from 'next/server'
import { adminFirestore } from '@lib/firebase-admin'

export async function GET(request, { params }) {
  try {
    const { customBoardId } = params // Extract the id from param

    const boardSnapshot = await adminFirestore
      .collection('boards')
      .where('boardId', '==', customBoardId)
      .get()

    if (boardSnapshot.empty) {
      return NextResponse.json({ error: 'Board not found' })
    }

    const boardDoc = boardSnapshot.docs[0]
    const boardData = {
      id: boardDoc.id,
      ...boardDoc.data(),
    }

    return NextResponse.json(boardData)
  } catch (error) {
    console.error('Error fetching board:', error)
    return NextResponse.json({ error: 'Failed to fetch board data' })
  }
}
