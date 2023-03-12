import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  eventInfo: any;
  formattedDate: string;
  formattedTime: string;
}

const baseUrl = process.env.APP_URL ? `${process.env.APP_URL}` : "";

export default function EmailTemplate({
  eventInfo,
  formattedDate,
  formattedTime,
}: EmailProps) {
  const previewText = `You're attending ${eventInfo.event_name}!`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px] flex flex-col items-center">
            <Img
              src={`${eventInfo.og_image}`}
              width="400"
              className="max-w-full"
            />
            <Heading className="text-gray-500 text-[16px] font-normal text-center p-0 my-[10px] mx-0">
              You're attending
            </Heading>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[10px] mx-0">
              <strong>{eventInfo.event_name}</strong>
            </Heading>
            <Text className="text-black text-[16px] font-normal text-center p-0 my-[5px] mx-0">
              At {formattedTime} on {formattedDate}
            </Text>
            <Text className="text-black text-[12px] font-normal text-center p-0 my-5px] mx-0">
              Can't make it anymore?{" "}
              <Link
                href={`${baseUrl}/events/${eventInfo.event_url}`}
                className="text-blue-600 no-underline  mx-auto"
              >
                Please let us know.
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
