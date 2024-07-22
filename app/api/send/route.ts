import { Resend } from "resend";
import EmailTemplate from "@/transactional/emails/confirmation";

export type SendEmailRequestData = {
  email: string;
  eventInfo: any;
  formattedDate: string;
  formattedTime: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json() as SendEmailRequestData;
    const { email, eventInfo, formattedDate, formattedTime } = body;

    if (!email || !eventInfo) {
      return new Response(JSON.stringify({ error: "Missing required data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Eventbase <hi@basecase.vc>",
      to: email,
      subject: `You're in!`,
      react: EmailTemplate({ eventInfo, formattedDate, formattedTime }),
    });

    if (error) {
      console.error("Resend API error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error in send route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}