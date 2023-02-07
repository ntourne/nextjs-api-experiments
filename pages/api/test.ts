import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";

const MAX_AGE_HOURS = 6;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", `s-maxage=${MAX_AGE_HOURS * 60 * 60}`);

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
