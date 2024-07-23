create table "public"."events" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "event_name" text,
    "location" text,
    "description" text,
    "og_image" text,
    "created_by" uuid,
    "event_url" text not null,
    "location_url" text,
    "start_timestampz" timestamp with time zone,
    "end_timestampz" timestamp with time zone,
    "show_discussion_topics" boolean,
    "timezone" text
);


alter table "public"."events" enable row level security;

create table "public"."guests" (
    "updated_at" timestamp with time zone default now(),
    "email" text not null,
    "full_name" text,
    "company_name" text,
    "dietary_restrictions" text,
    "id" uuid not null default uuid_generate_v4()
);


alter table "public"."guests" enable row level security;

create table "public"."rsvps" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "event_id" uuid,
    "comments" text,
    "discussion_topics" text,
    "email" text,
    "rsvp_type" text
);


alter table "public"."rsvps" enable row level security;

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX events_url_name_key ON public.events USING btree (event_url);

CREATE UNIQUE INDEX guests_email_key ON public.guests USING btree (email);

CREATE UNIQUE INDEX guests_new_id_key ON public.guests USING btree (id);

CREATE UNIQUE INDEX guests_pkey ON public.guests USING btree (id);

CREATE UNIQUE INDEX rsvps_pkey ON public.rsvps USING btree (id);

CREATE UNIQUE INDEX unique_email_event ON public.rsvps USING btree (email, event_id);

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."guests" add constraint "guests_pkey" PRIMARY KEY using index "guests_pkey";

alter table "public"."rsvps" add constraint "rsvps_pkey" PRIMARY KEY using index "rsvps_pkey";

alter table "public"."events" add constraint "events_created_by_fkey" FOREIGN KEY (created_by) REFERENCES guests(id) not valid;

alter table "public"."events" validate constraint "events_created_by_fkey";

alter table "public"."events" add constraint "events_url_name_key" UNIQUE using index "events_url_name_key";

alter table "public"."guests" add constraint "guests_email_key" UNIQUE using index "guests_email_key";

alter table "public"."guests" add constraint "guests_new_id_key" UNIQUE using index "guests_new_id_key";

alter table "public"."rsvps" add constraint "rsvps_email_fkey" FOREIGN KEY (email) REFERENCES guests(email) not valid;

alter table "public"."rsvps" validate constraint "rsvps_email_fkey";

alter table "public"."rsvps" add constraint "rsvps_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."rsvps" validate constraint "rsvps_event_id_fkey";

alter table "public"."rsvps" add constraint "unique_email_event" UNIQUE using index "unique_email_event";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."checkIfUser"(given_mail text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  RETURN (EXISTS (SELECT 1 FROM auth.users a WHERE a.email = given_mail));
END;$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  -- Check if a user with this email already exists
  IF EXISTS (SELECT 1 FROM public.guests WHERE email = new.email) THEN
    -- Update the existing user's auth_id
    UPDATE public.users
    SET id = new.id,
        updated_at = now()
    WHERE email = new.email;
  ELSE
    -- Insert a new user if no existing user is found
    INSERT INTO public.guests (id, email, updated_at)
    VALUES (new.id, new.email, now());
  END IF;
  RETURN new;
END;$function$
;

CREATE OR REPLACE FUNCTION public.pg_notify_trigger_event_public_rsvps()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	            declare
	                hasNew  bool = false;
	                hasOld  bool = false;
	                payload jsonb;
	            begin
	                if TG_OP = 'INSERT' then
	                    hasNew = true;
	                elseif TG_OP = 'UPDATE' then
	                    hasNew = true;
	                    hasOld = true;
	                else
	                    hasOld = true;
	                end if;
	                payload = jsonb_build_object(
	                        'table', TG_TABLE_NAME,
	                        'schema', TG_TABLE_SCHEMA,
	                        'event', to_jsonb(TG_OP),
	                        'user', current_user
	                    );
	                if hasNew then
	                    payload = jsonb_set(payload, '{new}', to_jsonb(NEW), true);
	                end if;
	                if hasOld then
	                    payload = jsonb_set(payload, '{old}', to_jsonb(OLD), true);
	                end if;
	                perform pg_notify('pg_notify_trigger_event', payload::text);
	                return NEW;
	            end;
	            $function$
;

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."guests" to "anon";

grant insert on table "public"."guests" to "anon";

grant references on table "public"."guests" to "anon";

grant select on table "public"."guests" to "anon";

grant trigger on table "public"."guests" to "anon";

grant truncate on table "public"."guests" to "anon";

grant update on table "public"."guests" to "anon";

grant delete on table "public"."guests" to "authenticated";

grant insert on table "public"."guests" to "authenticated";

grant references on table "public"."guests" to "authenticated";

grant select on table "public"."guests" to "authenticated";

grant trigger on table "public"."guests" to "authenticated";

grant truncate on table "public"."guests" to "authenticated";

grant update on table "public"."guests" to "authenticated";

grant delete on table "public"."guests" to "service_role";

grant insert on table "public"."guests" to "service_role";

grant references on table "public"."guests" to "service_role";

grant select on table "public"."guests" to "service_role";

grant trigger on table "public"."guests" to "service_role";

grant truncate on table "public"."guests" to "service_role";

grant update on table "public"."guests" to "service_role";

grant delete on table "public"."rsvps" to "anon";

grant insert on table "public"."rsvps" to "anon";

grant references on table "public"."rsvps" to "anon";

grant select on table "public"."rsvps" to "anon";

grant trigger on table "public"."rsvps" to "anon";

grant truncate on table "public"."rsvps" to "anon";

grant update on table "public"."rsvps" to "anon";

grant delete on table "public"."rsvps" to "authenticated";

grant insert on table "public"."rsvps" to "authenticated";

grant references on table "public"."rsvps" to "authenticated";

grant select on table "public"."rsvps" to "authenticated";

grant trigger on table "public"."rsvps" to "authenticated";

grant truncate on table "public"."rsvps" to "authenticated";

grant update on table "public"."rsvps" to "authenticated";

grant delete on table "public"."rsvps" to "service_role";

grant insert on table "public"."rsvps" to "service_role";

grant references on table "public"."rsvps" to "service_role";

grant select on table "public"."rsvps" to "service_role";

grant trigger on table "public"."rsvps" to "service_role";

grant truncate on table "public"."rsvps" to "service_role";

grant update on table "public"."rsvps" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."events"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."events"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."events"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."events"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable delete for users based on user_id"
on "public"."guests"
as permissive
for delete
to authenticated
using (true);


create policy "Public profiles are viewable by everyone."
on "public"."guests"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."guests"
as permissive
for insert
to public
with check (true);


create policy "Users can update own profile."
on "public"."guests"
as permissive
for update
to public
using (true)
with check (true);


create policy "Enable delete for users based on user_id"
on "public"."rsvps"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."rsvps"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."rsvps"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."rsvps"
as permissive
for update
to public
using (true)
with check (true);



alter table "auth"."audit_log_entries" enable row level security;

alter table "auth"."flow_state" enable row level security;

alter table "auth"."identities" enable row level security;

alter table "auth"."instances" enable row level security;

alter table "auth"."mfa_amr_claims" enable row level security;

alter table "auth"."mfa_challenges" enable row level security;

alter table "auth"."mfa_factors" enable row level security;

alter table "auth"."one_time_tokens" enable row level security;

alter table "auth"."refresh_tokens" enable row level security;

alter table "auth"."saml_providers" enable row level security;

alter table "auth"."saml_relay_states" enable row level security;

alter table "auth"."schema_migrations" enable row level security;

alter table "auth"."sessions" enable row level security;

alter table "auth"."sso_domains" enable row level security;

alter table "auth"."sso_providers" enable row level security;

alter table "auth"."users" enable row level security;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.operation()
 RETURNS text
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$function$
;

CREATE OR REPLACE FUNCTION storage.extension(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$function$
;

CREATE OR REPLACE FUNCTION storage.filename(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$function$
;

CREATE OR REPLACE FUNCTION storage.foldername(name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$function$
;

create policy "anyone can view 1ffg0oo_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'images'::text));


create policy "authenticated users can delete"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'images'::text));


create policy "authenticated users can insert"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'images'::text));


create policy "authenticated users can update"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'images'::text));



