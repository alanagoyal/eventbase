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
import { ExternalLink, MapPinIcon, UserIcon } from "lucide-react";
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
  
  const eventUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${event.event_url}`;

  return (
    <Link href={eventUrl} className="block w-full">
      <Card className="w-full hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <div className="flex-grow">
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
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <UserIcon className="w-6 h-6 text-pink-300" />
                    <span className="ml-2">{event.host?.full_name}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <MapPinIcon className="w-6 h-6 text-pink-300" />
                    {event.location_url ? (
                      <Link href={event.location_url} target="_blank" rel="noopener noreferrer" className="ml-2 flex items-center hover:underline">
                        {event.location}
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Link>
                    ) : (
                      <span className="ml-2">{event.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Badge>{event.type === 'attending' ? 'Attending' : 'Hosting'}</Badge>
            </CardFooter>
          </div>
          <div className="w-1/3 p-4 flex items-center justify-center">
            <img
              src={event.og_image || '/sf.jpg'}
              alt={event.event_name || 'Event Image'}
              className="max-w-full max-h-full object-cover rounded-md"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}