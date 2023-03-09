import { supabase } from "@/lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { event_url } = req.query;
  console.log(`body is ${event_url}`);

  if (!event_url) {
    return res.status(400).json({ message: "Missing event_url parameter" });
  }

  try {
    let { data, error, status } = await supabase
      .from("events")
      .select()
      .eq("event_url", event_url)
      .single();

    console.log({ data });
    res.status(200).json({ event: data });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
}
