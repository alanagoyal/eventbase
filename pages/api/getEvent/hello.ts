import type { NextApiRequest, NextApiResponse } from "next";
// we import our `helloWorld()` background function

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // calling a background function triggers an execution on Defer Platform

  res.status(200).json({ ok: true });
}
