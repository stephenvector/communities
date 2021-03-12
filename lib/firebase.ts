import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.NEXT_SERVICE_ACCOUNT as admin.ServiceAccount),
  });
}

export const firestoreAdmin = admin.firestore();
export const authAdmin = admin.auth();
