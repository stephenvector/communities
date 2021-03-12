import { NextApiHandler } from "next";
import getCommunities from "../../lib/getCommunities";

const communitiesHandler: NextApiHandler = async (req, res) => {
  const communities = await getCommunities();
  res.json({ communities });
};

export default communitiesHandler;
