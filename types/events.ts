import { Database } from "@/types/supabase";

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventWithHost = Event & {
  host: { full_name: string } | null;
};

export type EventWithHostAndType = EventWithHost & {
  type: 'attending' | 'hosting';
};