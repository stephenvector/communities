import { firebaseAdmin } from "./firebase";

/**
 * Returns a map of users' display names
 *
 * @param userIds Array of user ids
 */
export default async function getUsers(userIds: string[]) {
  const userDisplayNames: Record<string, string> = {};
  const uidIdentifiers = userIds.map((userId) => ({
    uid: userId,
  }));
  const usersResult = await firebaseAdmin.auth().getUsers(uidIdentifiers);

  usersResult.users.forEach((user) => {
    userDisplayNames[user.uid] = user.displayName ? user.displayName : user.uid;
  });

  return userDisplayNames;
}
