import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", `s-maxage=15, stale-while-revalidate=60`);

  const { name } = req.query;

  const dateString = dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  const response = {
    name,
    createdAt: dateString,
  };

  return res.status(200).json(response);
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};
