import * as admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const adminFirestore = admin.firestore()

export { adminFirestore }

// Initializes Firebase Admin SDK with service account credentials to enable
// secure server-side access to Firestore, exporting `adminFirestore` for database operations in the app.
