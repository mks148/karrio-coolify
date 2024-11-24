import {
  formatAddressRegion,
  formatDayDate,
  formatRef,
  isNone,
} from "@karrio/lib";
import {
  TrackerStatusEnum,
  TrackerType,
  TrackingEventType,
} from "@karrio/types";
import { CarrierImage } from "@karrio/ui/components/carrier-image";
import { AppLink } from "@karrio/ui/components/app-link";
import React, { useRef, useState } from "react";
import { useLocation } from "@karrio/hooks/location";

type DayEvents = { [k: string]: TrackingEventType[] };
type TrackingPreviewContextType = {
  previewTracker: (tracker: TrackerType) => void;
};

interface TrackingPreviewComponent {
  children?: React.ReactNode;
}

export const TrackingPreviewContext =
  React.createContext<TrackingPreviewContextType>(
    {} as TrackingPreviewContextType,
  );

export const TrackingPreview: React.FC<TrackingPreviewComponent> = ({
  children,
}) => {
  const link = useRef<HTMLAnchorElement>(null);
  const { addUrlParam, removeUrlParam } = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sharingLink, setSharingLink] = useState<string>("");
  const [key, setKey] = useState<string>(`tracker-${Date.now()}`);
  const [tracker, setTracker] = useState<TrackerType>();

  const previewTracker = (tracker: TrackerType) => {
    setTracker(tracker);
    setIsActive(true);
    setKey(`tracker-${Date.now()}`);
    link.current?.setAttribute("href", `/tracking/${tracker.id}`);
    setSharingLink(link.current?.href as string);
    addUrlParam("modal", tracker.id);
  };
  const dismiss = (_?: React.MouseEvent) => {
    setIsActive(false);
    setTracker(undefined);
    setKey(`tracker-${Date.now()}`);
    removeUrlParam("modal");
  };
  const copy = (_: React.MouseEvent) => {
    var input = document.createElement("input");
    input.setAttribute("value", sharingLink);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  };
  const computeColor = (tracker: TrackerType) => {
    if (tracker?.delivered) return "has-background-success";
    else if (tracker?.status === TrackerStatusEnum.pending.toString())
      return "has-background-grey-dark";
    else if (
      [
        TrackerStatusEnum.on_hold.toString(),
        TrackerStatusEnum.delivery_delayed.toString(),
      ].includes(tracker?.status as string)
    )
      return "has-background-warning";
    else if (
      [TrackerStatusEnum.unknown.toString()].includes(tracker?.status as string)
    )
      return "has-background-grey";
    else if (
      [TrackerStatusEnum.delivery_failed.toString()].includes(
        tracker?.status as string,
      )
    )
      return "has-background-danger";
    else return "has-background-info";
  };
  const computeStatus = (tracker: TrackerType) => {
    if (tracker?.delivered) return "Delivered";
    else if (tracker?.status === TrackerStatusEnum.pending.toString())
      return "Pending";
    else if (
      [
        TrackerStatusEnum.on_hold.toString(),
        TrackerStatusEnum.delivery_delayed.toString(),
        TrackerStatusEnum.ready_for_pickup.toString(),
        TrackerStatusEnum.unknown.toString(),
        TrackerStatusEnum.delivery_failed.toString(),
      ].includes(tracker?.status as string)
    )
      return formatRef(tracker!.status as string);
    else return "In-Transit";
  };
  const computeEvents = (tracker: TrackerType): DayEvents => {
    return (tracker?.events || []).reduce(
      (days: any, event: TrackingEventType) => {
        const daydate = formatDayDate(event.date as string);
        return { ...days, [daydate]: [...(days[daydate] || []), event] };
      },
      {} as DayEvents,
    );
  };

  return (
    <>
      <TrackingPreviewContext.Provider value={{ previewTracker }}>
        {children}
      </TrackingPreviewContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <a ref={link}></a>
        <div className="modal-background" onClick={dismiss}></div>

        {!isNone(tracker) && (
          <div className="modal-card">
            <section className="modal-card-body">
              <div className="has-text-centered pb-4">
                <CarrierImage
                  carrier_name={
                    (tracker?.meta as any)?.carrier || tracker?.carrier_name
                  }
                  width={60}
                  height={60}
                  text_color={tracker?.tracking_carrier?.config?.text_color}
                  background={tracker?.tracking_carrier?.config?.brand_color}
                />
              </div>

              <p className="subtitle has-text-centered is-6 my-3">
                <span>Tracking ID</span>{" "}
                <strong>{tracker?.tracking_number}</strong>
              </p>

              {!isNone(tracker?.estimated_delivery) && (
                <p className="subtitle has-text-centered is-6 mb-3">
                  <span>
                    {tracker?.delivered ? "Delivered" : "Estimated Delivery"}
                  </span>{" "}
                  <strong>
                    {formatDayDate(tracker!.estimated_delivery as string)}
                  </strong>
                </p>
              )}

              <p
                className={
                  computeColor(tracker as TrackerType) +
                  " block has-text-centered has-text-white is-size-4 py-3"
                }
              >
                {computeStatus(tracker as TrackerType)}
              </p>

              <hr />

              <div
                className="my-3 pl-3"
                style={{ maxHeight: "40vh", overflowY: "scroll" }}
              >
                <aside className="menu">
                  <ul className="menu-list mb-5" style={{ maxWidth: "28rem" }}>
                    {Object.entries(computeEvents(tracker as TrackerType)).map(
                      ([day, events], index) => (
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
                      ),
                    )}
                  </ul>
                </aside>
              </div>

              {(tracker?.messages || []).length > 0 && (
                <div className="notification is-warning">
                  <p className="is-size-7 my-1 has-text-weight-semibold has-text-grey">
                    {(tracker?.messages || [{}])[0].message}
                  </p>
                </div>
              )}

              {!isNone(tracker?.shipment) && (
                <>
                  <hr />
                  <p className="has-text-weight-bold my-4 is-size-6">
                    Shipment details
                  </p>

                  <div className="columns my-0">
                    <div className="column is-3 is-size-7 py-1">
                      Origin/Destination
                    </div>
                    <div className="column is-size-7 has-text-weight-semibold py-1">
                      <span>
                        {formatAddressRegion(tracker?.shipment?.shipper as any)}
                      </span>
                      <i className="fa fa-arrow-right px-3"></i>
                      <span>
                        {formatAddressRegion(
                          tracker?.shipment?.recipient as any,
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="columns my-0">
                    <div className="column is-3 is-size-7 py-1">Service</div>
                    <div className="column is-size-7 has-text-weight-semibold py-1">
                      {formatRef(
                        tracker?.info?.shipment_service ||
                          tracker?.shipment?.meta?.service_name ||
                          tracker?.shipment?.service,
                      )}
                    </div>
                  </div>

                  {tracker?.shipment?.reference && (
                    <div className="columns my-0">
                      <div className="column is-3 is-size-7 py-1">
                        Reference
                      </div>
                      <div className="column is-size-7 has-text-weight-semibold py-1">
                        {tracker?.shipment?.reference}
                      </div>
                    </div>
                  )}

                  <div className="columns my-0">
                    <div className="column is-3 is-size-7 py-1">Link</div>
                    <div className="column py-1">
                      <AppLink
                        className="has-text-info p-0 m-0 is-size-7 has-text-weight-semibold"
                        href={`/shipments/${tracker?.shipment?.id}`}
                        target="_blank"
                      >
                        <span>{tracker?.shipment?.id}</span>{" "}
                        <span style={{ fontSize: "0.7em" }}>
                          <i className="fas fa-external-link-alt"></i>
                        </span>
                      </AppLink>
                    </div>
                  </div>
                </>
              )}

              <hr />

              <div className="field">
                <div className="control">
                  <label className="label">Share</label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Click to Copy"
                    value={sharingLink}
                    style={{ width: "80%" }}
                    readOnly
                  />
                  <button
                    className="button is-small is-light mx-1"
                    onClick={copy}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-copy"></i>
                    </span>
                  </button>
                  <a
                    className="button is-small is-light"
                    href={sharingLink}
                    target="_blank"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-share-square"></i>
                    </span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        <button
          className="modal-close is-large has-background-dark"
          aria-label="close"
          onClick={dismiss}
        ></button>
      </div>
    </>
  );
};
