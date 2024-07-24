import { Database } from "@/types/supabase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatEventDates } from "@/utils/dates";
import { Badge } from "./ui/badge";
import { MapPinIcon, UserIcon } from "lucide-react";
import Link from 'next/link';

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventWithHost = Event & {
  host: { full_name: string } | null;
};
type EventWithHostAndType = EventWithHost & {
  type: 'attending' | 'hosting';
};

export default function EventCard({ event }: { event: EventWithHostAndType }) {
  const { formattedDate, formattedTime } = formatEventDates(
    event.start_timestampz!,
    event.end_timestampz!
  );
  
  const eventUrl = `/${event.event_url}`;
  const imageUrl = event.og_image || process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL;

  return (
    <Link href={eventUrl} className="w-full block">
      <Card className="w-full hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-stretch">
          <div className="flex-grow pr-4">
            <CardHeader>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
              <p className="text-sm text-muted-foreground">{formattedTime}</p>
              <CardTitle>{event.event_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="pb-4">
                  <p>{event.description}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <UserIcon className="w-5 h-5 text-pink-300 flex-shrink-0" />
                    <span className="ml-2 text-sm">{event.host?.full_name}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-pink-300 flex-shrink-0" />
                    <span className="ml-2 text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Badge>{event.type === 'attending' ? 'Attending' : 'Hosting'}</Badge>
            </CardFooter>
          </div>
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="w-full h-full overflow-hidden">
              <img
                src={imageUrl}
                alt={event.event_name || 'Event Image'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}