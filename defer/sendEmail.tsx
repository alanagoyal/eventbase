import React from "react";
import { Resend } from "resend";
import { defer } from "@defer/client";
import { SendEmailRequestData } from "@/pages/api/send";
import EmailTemplate from "@/transactional/emails/confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({
  email,
  eventInfo,
  formattedDate,
  formattedTime,
}: SendEmailRequestData) {
  return await resend.sendEmail({
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
}

export default defer(sendEmail, { concurrency: 10 });
