import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import EmailTemplate from "../../transactional/emails/confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailRequestData = {
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
    const data = await resend.sendEmail({
      from: "hi@basecase.vc",
      to: email,
      subject: "You're in!",
      react: (
        <EmailTemplate
          eventInfo={eventInfo}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
        />
      ),
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e);
  }
};
