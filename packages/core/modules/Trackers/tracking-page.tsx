import { TrackingEvent, TrackingStatus } from "@karrio/types/rest/api";
import { formatDayDate, isNone, KARRIO_API, url$ } from "@karrio/lib";
import { dynamicMetadata } from "@karrio/core/components/metadata";
import { CarrierImage } from "@karrio/ui/components/carrier-image";
import { Collection, KarrioClient } from "@karrio/types";
import { loadMetadata } from "@karrio/core/context/main";
import Link from "next/link";
import React from "react";

export const generateMetadata = dynamicMetadata("Tracking");

type DayEvents = { [k: string]: TrackingEvent[] };

export default async function Page({ params }: { params: Collection }) {
  const id = params?.id as string;
  const { metadata } = await loadMetadata();
  const client = new KarrioClient({
    basePath: url$`${(metadata?.HOST as string) || KARRIO_API}`,
  });
  const { data: tracker, message } = await client.trackers
    .retrieve({ idOrTrackingNumber: id })
    .then(({ data }) => ({ data, message: null }))
    .catch((_) => {
      console.log(_.response?.data?.errors || _.response);
      return {
        data: null,
        message: `No Tracker ID nor Tracking Number found for ${id}`,
      };
    });

  const computeEvents = (tracker: TrackingStatus): DayEvents => {
    return (tracker?.events || []).reduce((days, event: TrackingEvent) => {
      const daydate = formatDayDate(event.date as string);
      return { ...days, [daydate]: [...(days[daydate] || []), event] };
    }, {} as DayEvents);
  };

  return (
    <>
      <section className="hero is-fullheight p-2">
        <div className="container">
          <div className="has-text-centered my-4">
            <Link legacyBehavior href="/">
              <span className="is-size-4 has-text-primary has-text-weight-bold is-lowercase">
                {metadata?.APP_NAME}
              </span>
            </Link>
          </div>

          {!isNone(tracker) && (
            <>
              <div className="card isolated-card">
                <div className="card-content">
                  <div className="pb-4 is-flex is-justify-content-center">
                    <CarrierImage
                      carrier_name={tracker!.carrier_name}
                      width={60}
                      height={60}
                    />
                  </div>

                  <p className="subtitle has-text-centered is-6 my-3">
                    <span>Tracking ID</span>{" "}
                    <strong>{tracker?.tracking_number}</strong>
                  </p>

                  {!isNone(tracker?.estimated_delivery) && (
                    <p className="subtitle has-text-centered is-6 mb-3">
                      <span>
                        {tracker?.delivered
                          ? "Delivered"
                          : "Estimated Delivery"}
                      </span>{" "}
                      <strong>
                        {formatDayDate(tracker!.estimated_delivery as string)}
                      </strong>
                    </p>
                  )}
                </div>

                <footer className="card-footer">
                  {tracker?.status === "delivered" && (
                    <p className="card-footer-item has-background-success has-text-white is-size-4">
                      Delivered
                    </p>
                  )}

                  {tracker?.status === "in_transit" && (
                    <p className="card-footer-item has-background-info has-text-white is-size-4">
                      In-Transit
                    </p>
                  )}

                  {tracker?.status !== "delivered" &&
                    tracker?.status !== "in_transit" && (
                      <p className="card-footer-item has-background-grey-dark has-text-white is-size-4">
                        Pending
                      </p>
                    )}
                </footer>
              </div>

              <hr />

              <div className="my-6">
                <aside className="menu">
                  <ul className="menu-list mb-5" style={{ maxWidth: "28rem" }}>
                    {Object.entries(
                      computeEvents(tracker as TrackingStatus),
                    ).map(([day, events], index) => (
                      <li key={index}>
                        <p className="menu-label is-size-6 is-capitalized">
                          {day}
                        </p>

                        {events.map((event, index) => (
                          <ul key={index}>
                            <li className="my-2">
                              <code>{event.time}</code>
                              <span className="is-subtitle is-size-7 my-1 has-text-weight-semibold">
                                {event.location}
                              </span>
                            </li>
                            <li className="my-2">
                              <span className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                {event.description}
                              </span>
                            </li>
                          </ul>
                        ))}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </>
          )}

          {!isNone(message) && (
            <div className="card isolated-card my-6">
              <div className="card-content has-text-centered ">
                <p>{message}</p>
              </div>
            </div>
          )}
        </div>

        <hr className="mt-4" />

        <div className="hero-footer mb-4">
          <div className="content has-text-centered">
            <p>
              <Link legacyBehavior href="/" className="button is-white">
                <span>Powered by &copy; {metadata?.APP_NAME}</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
