"use client";

import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

export default function Events({allRsvps, allHostings}: {allRsvps: any, allHostings: any}){
    return (
        <div className="p-4">
          <Head>
            <title>Events</title>
          </Head>
          {allRsvps && allRsvps.length ? (
            <div className="flex-col sm:flex  mx-auto max-w-6xl pt-20 pb-5">
              <h1 className="sm:text-3xl text-3xl max-w-2xl font-bold pt-4">
                You&apos;re attending ✨
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {allRsvps &&
                  allRsvps.map((event: any) => {
                    return (
                      <div
                        className="flex flex-col items-center text-center"
                        key={event.event_id?.id}
                      >
                        <Link href={`/events/${event.event_id?.event_url}`}>
                          <div>
                            <img
                              src={event.event_id?.og_image}
                              alt={event.event_id?.event_name}
                              className="w-full mb-2"
                              width="200"
                              height="200"
                            />
                          </div>
                        </Link>
                        <div className="text-lg font-bold">
                          {event.event_id?.event_name}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}
          {allHostings && allHostings.length ? (
            <div className="flex-col sm:flex  mx-auto max-w-6xl pt-5 pb-5">
              <h1 className="sm:text-3xl text-3xl max-w-2xl font-bold pt-4">
                You&apos;re hosting 🤗
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {allHostings &&
                  allHostings.map((event: any) => (
                    <div
                      className="flex flex-col items-center text-center"
                      key={event.id}
                    >
                      <Link href={`/events/${event.event_url}`}>
                        <div>
                          <img
                            src={event.og_image}
                            alt={event.event_name}
                            className="w-full mb-2"
                            width="200"
                            height="200"
                          />
                        </div>
                      </Link>
                      <div className="text-lg font-bold">{event.event_name}</div>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
          {!allRsvps?.length && !allHostings?.length ? (
            <main className="container mx-auto my-48 flex-grow">
              <section className="text-center">
                <div className="mt-8">
                  <Link href="/new_event">
                    <Button
                      className="bg-pink-500 text-white h-12 w-64 px-8 py-4 rounded-md text-xl"
                      style={{
                        background:
                          "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
                      }}
                    >
                      Create an event
                    </Button>
                  </Link>
                </div>
              </section>
              <section className="mt-24 flex justify-center"></section>
            </main>
          ) : null}
        </div>
      );
    }    