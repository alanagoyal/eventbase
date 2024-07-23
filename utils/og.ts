import { formatInTimeZone } from "date-fns-tz";
import { getPlaiceholder } from "plaiceholder";

export function formatTimezone(timezone: string): string {
  const abbreviations: { [key: string]: string } = {
    "America/Los_Angeles": "PST",
    "America/New_York": "EST",
    "America/Chicago": "CST",
    "America/Denver": "MST",
    "Europe/London": "GMT",
    "Europe/Paris": "CET",
  };
  return abbreviations[timezone] || timezone;
}

export function formatTime(date: Date, timezone: string) {
  return formatInTimeZone(date, timezone, "h:mm a");
}

export function getComplementaryColor(hex: string): string {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const comp = 0xffffff ^ rgb;
  return `#${comp.toString(16).padStart(6, '0')}`;
}

export function adjustColor(color: string, amount: number): string {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 255);
  const hex = color.replace(/^#/, '');
  const num = parseInt(hex, 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00FF) + amount);
  const b = clamp((num & 0x0000FF) + amount);
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

export async function getImageColors(imageUrl: string | null | undefined) {
  let backgroundColor = "#1a1a1a";
  let textColor = "#ffffff";
  let gradientColor1 = "#1a1a1a";
  let gradientColor2 = "#000000";

  if (!imageUrl) {
    console.warn("No image URL provided for color extraction");
    return { backgroundColor, textColor, gradientColor1, gradientColor2 };
  }

  try {
    const buffer = await fetch(imageUrl).then(
      async (res) => Buffer.from(await res.arrayBuffer())
    );
    const { color } = await getPlaiceholder(buffer);
    backgroundColor = color.hex;
    
    gradientColor1 = backgroundColor;
    gradientColor2 = getComplementaryColor(backgroundColor);

    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    textColor = luminance > 0.5 ? "#000000" : "#ffffff";
  } catch (error) {
    console.error("Error extracting colors:", error);
  }

  return { backgroundColor, textColor, gradientColor1, gradientColor2 };
}