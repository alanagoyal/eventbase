## Getting Started

hi

### Set up your database

[Create a new Supabase project](https://app.supabase.com/), enter your project details, and wait for the database to launch. Navigate to the [SQL editor](https://app.supabase.com/project/_/sql) in the dashboard, paste the SQL below, and run it.

```
-- Create tables for guests, events, and rsvps
create table guests (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  email text unique,
  full_name text,
  dietary_restrictions text,
  company_name text,
);

create table events (
    id uuid not null primary key,
    created_by references public.guests.id not null,
    created_at timestamp with time zone,
    event_name text,
    description text,
    location text,
    location_url text,
    og_image text,
    event_url text,
    start_timestampz timestamp with time zone,
    end_timestampz timestamp with time zone,
);

create table rsvps (
    id uuid not null primary key,
    created_at timestamp with time zone,
    event_id uuid references public.events.id not null,
    email text references public.guests.email,
    comments text,
    discussion_topics text,
);

-- This trigger automatically creates a guest when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.guests (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Grab the project URL and anon key from the [API settings](https://app.supabase.com/project/_/settings/api) and put them in a new `.env.local` file in the root directory as shown:

```
NEXT_PUBLIC_SUPABASE_URL = "https://<project>.supabase.co";
NEXT_PUBLIC_SUPABASE_ANON_KEY = "<your-anon-key>";
```

### Install dependencies

You'll also need API keys for [Pyq](https://www.pyqai.com/), [Resend](https://resend.com/), [Google Maps](https://developers.google.com/maps). Put them in a `.env` file as shown in the `.env.example`.

Run `npm install`
