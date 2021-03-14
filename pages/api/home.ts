import { NextApiHandler } from "next";
import getHomePageData from "../../lib/getHomePageData";

const homeHandler: NextApiHandler = async (_req, res) => {
  const homePageData = await getHomePageData();
  res.json(homePageData);
};

export default homeHandler;
