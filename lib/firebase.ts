import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.NEXT_SERVICE_ACCOUNT as string)
    ),
  });
}

export const firebaseAdmin = admin;
export const firestoreAdmin = admin.firestore();
export const authAdmin = admin.auth();
