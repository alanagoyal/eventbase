import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "@/defer/sendEmail";

export type SendEmailRequestData = {
  email: string;
  eventInfo: any;
  formattedDate: string;
  formattedTime: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, eventInfo, formattedDate, formattedTime } =
      req.body as SendEmailRequestData;
    console.log(req.body);
    const data = await sendEmail({
      email,
      eventInfo,
      formattedDate,
      formattedTime,
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e);
  }
};
