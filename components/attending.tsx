import Link from "next/link";

export default function AttendingEvents({ allRsvps }: { allRsvps: any }) {
  if (!allRsvps || allRsvps.length === 0) return null;

  return (
    <div className="flex-col sm:flex mx-auto max-w-6xl py-2">
      <h1 className="text-xl max-w-2xl font-bold">Attending</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
        {allRsvps.map((event: any, index: number) => (
          <div
            className="flex flex-col items-center text-center"
            key={event.event.id || `event-${index}`}
          >
            <Link href={`/${event.event.event_url}`}>
              <div>
                <img
                  src={event.og_image || '/sf.jpg'}
                  alt={event.event.event_name}
                  className="w-full mb-2"
                  width="200"
                  height="200"
                />
              </div>
            </Link>
            <div className="text-lg font-bold">{event.event.event_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}