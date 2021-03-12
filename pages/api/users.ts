import { NextApiHandler } from "next";
import { authAdmin } from "../../lib/firebase";

const users: NextApiHandler = async (req, res) => {
  const users = await authAdmin.listUsers(1000);

  const usersRecords: Record<string, string> = {};

  users.users.forEach((user) => {
    usersRecords[user.uid] = user.displayName ? user.displayName : user.uid;
  });

  res.json({ users: usersRecords });
};

export default users;
