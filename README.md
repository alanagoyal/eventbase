## About

Eventbase is a simple platform to create and manage in-person events. Sign up to create events, send the links to attendees, and manage their RSVPs. The platform allows attendees to RSVP for events without creating an account, but will store their preferences and remember them if they choose to create an account in the future.

I built this project as an experiement to evaluate as many dev tool & infra companies in the YC W23 batch as I could. Read more about my takeaways here.

## Getting Started

### Clone the repository

`git clone https://github.com/alanagoyal/eventbase`

### Set up your database

[Create a new Supabase project](https://app.supabase.com/), enter your project details, and wait for the database to launch. Grab the project URL and anon key from the [API settings](https://app.supabase.com/project/_/settings/api) and put them in a new `.env.local` file in the root directory as shown:

```
NEXT_PUBLIC_SUPABASE_URL = "https://<project>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY = "<your-anon-key>"
```

### Install dependencies

You'll need API keys for the following:
- [Resend](https://resend.com/) is a new email API for developers. I used it to send guests a beautiful confirmation email when they RSVP to an event.

Previous versions of this project used:
- [Frigade](https://frigade.com/) provides onboarding infrastructure for developers. I used it to give new users a quick tour of the product.
- [Highlight](https://highlight.io/) is an open-source, full-stack monitoring platform. I used it to replay user sessions and debug frontend errors.
- [Pyq](https://www.pyqai.com/) makes it easy for non-ML engineers to add ML features into their applications. I used it to generate an image based on the title of the event.
- [Google Maps](https://developers.google.com/maps) is an API for places. I used it to autocomplete the location when a user is creating an event.

Put them in a `.env` file as shown in the `.env.example`.

Install the dependencies
`npm install`

### Run the application

Run the application in the command line and it will be available at http://localhost:3000.

`npm run dev`

### Deploy

Deploy using [Vercel](https://vercel.com)
