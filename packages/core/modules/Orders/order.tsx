"use client";
import {
  MetadataEditor,
  MetadataEditorContext,
} from "@karrio/ui/forms/metadata-editor";
import {
  formatAddressLocation,
  formatDateTime,
  formatRef,
  isNone,
} from "@karrio/lib";
import { CommodityDescription } from "@karrio/ui/components/commodity-description";
import { AddressDescription } from "@karrio/ui/components/address-description";
import { StatusCode } from "@karrio/ui/components/status-code-badge";
import { dynamicMetadata } from "@karrio/core/components/metadata";
import { CopiableLink } from "@karrio/ui/components/copiable-link";
import { StatusBadge } from "@karrio/ui/components/status-badge";
import { OrderMenu } from "@karrio/ui/components/order-menu";
import { useLoader } from "@karrio/ui/components/loader";
import { AppLink } from "@karrio/ui/components/app-link";
import { Spinner } from "@karrio/ui/components/spinner";
import { MetadataObjectTypeEnum } from "@karrio/types";
import { useEvents } from "@karrio/hooks/event";
import { useOrder } from "@karrio/hooks/order";
import { useLogs } from "@karrio/hooks/log";
import React from "react";

export const generateMetadata = dynamicMetadata("Orders");

export const OrderComponent: React.FC<{
  orderId: string;
  isPreview?: boolean;
}> = ({ orderId, isPreview }) => {
  const { setLoading } = useLoader();
  const entity_id = orderId;
  const { query: logs } = useLogs({ entity_id });
  const { query: events } = useEvents({ entity_id });
  const {
    query: { data: { order } = {}, ...query },
  } = useOrder(entity_id);

  React.useEffect(() => {
    setLoading(query.isFetching);
  }, [query.isFetching]);

  return (
    <>
      {!query.isFetched && query.isFetching && <Spinner />}

      {order && (
        <>
          {/* Header section */}
          <div className="columns my-1">
            <div className="column is-6">
              <span className="subtitle is-size-7 has-text-weight-semibold">
                ORDER
              </span>
              <br />
              <span className="title is-4 mr-2">{order?.order_id}</span>
              <StatusBadge status={order?.status} />
            </div>

            <div className="column is-6 pb-0">
              <div className="is-flex is-justify-content-right">
                <CopiableLink text={order?.id as string} title="Copy ID" />
              </div>
              <div className="is-flex is-justify-content-right">
                {isPreview && (
                  <AppLink
                    className="button is-white has-text-info is-small mx-1"
                    href={`/orders/${orderId}`}
                    target="_blank"
                  >
                    <span className="icon">
                      <i className="fas fa-external-link-alt"></i>
                    </span>
                  </AppLink>
                )}

                <div style={{ display: "inline-flex" }}>
                  <OrderMenu order={order as any} isViewing />
                </div>
              </div>
            </div>
          </div>

          {/* Reference and highlights section */}
          <hr className="mt-1 mb-2" style={{ height: "1px" }} />

          <div className="columns mb-4">
            <div className="p-4 mr-4">
              <span className="subtitle is-size-7 my-4">Date</span>
              <br />
              <span className="subtitle is-size-7 mt-1 has-text-weight-semibold">
                {formatDateTime(order?.created_at)}
              </span>
            </div>

            {!isNone(order?.source) && (
              <>
                <div
                  className="my-2"
                  style={{ width: "1px", backgroundColor: "#ddd" }}
                ></div>
                <div className="p-4 mr-4">
                  <span className="subtitle is-size-7 my-4">Source</span>
                  <br />
                  <span className="subtitle is-size-7 has-text-weight-semibold">
                    {order?.source}
                  </span>
                </div>
              </>
            )}
          </div>

          <h2 className="title is-5 my-5">Order Details</h2>
          <hr className="mt-1 mb-2" style={{ height: "1px" }} />

          <div className="mt-3 mb-6">
            {/* address and line items section */}
            <div className="columns my-0 is-multiline">
              {/* Shipping Address section */}
              <div className="column is-6 is-size-6 py-1">
                <p className="is-title is-size-6 my-2 has-text-weight-semibold">
                  ADDRESS
                </p>

                <p className="is-size-6 my-1">
                  {order?.shipping_to.person_name}
                </p>
                <p className="is-size-6 my-1">
                  {order?.shipping_to.company_name}
                </p>
                <p className="is-size-6 my-1 has-text-info">
                  {order?.shipping_to.email}
                </p>
                <p className="is-size-6 my-1 has-text-info">
                  {order?.shipping_to.phone_number}
                </p>
                <p className="is-size-6 my-1">
                  <span>{order?.shipping_to.address_line1}</span>
                  {!isNone(order?.shipping_to.address_line2) && (
                    <span>{order?.shipping_to.address_line2}</span>
                  )}
                </p>
                <p className="is-size-6 my-1">
                  {formatAddressLocation(order?.shipping_to)}
                </p>
              </div>

              {/* Line Items section */}
              <div className="column is-6 is-size-6 py-1">
                <p className="is-title is-size-6 my-2 has-text-weight-semibold">
                  LINE ITEMS (
                  {order?.line_items.reduce(
                    (_, { quantity }) => _ + (quantity || 1),
                    0,
                  )}
                  )
                </p>

                <div
                  className="menu-list py-2 pr-1"
                  style={{ maxHeight: "40em", overflow: "auto" }}
                >
                  {order?.line_items.map((item, index) => (
                    <React.Fragment key={index + "parcel-info"}>
                      <hr className="mt-1 mb-2" style={{ height: "1px" }} />
                      <CommodityDescription commodity={item} />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Options section */}
            <div className="columns mt-6 mb-0 is-multiline">
              {Object.values(order?.options as object).length > 0 && (
                <div className="column is-6 is-size-6 py-1">
                  <p className="is-title is-size-6 my-2 has-text-weight-semibold">
                    ORDER OPTIONS
                  </p>

                  {Object.entries(order?.options).map(
                    ([key, value]: any, index) => (
                      <React.Fragment key={index + "item-info"}>
                        <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                          <span>
                            {formatRef(key).toLowerCase()}:{" "}
                            <strong>{String(value)}</strong>
                          </span>
                        </p>
                      </React.Fragment>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Billing address section */}
            <div className="columns mt-6 mb-0 is-multiline">
              {order?.billing_address && (
                <div className="column is-6 is-size-6 py-1">
                  <p className="is-title is-size-6 my-2 has-text-weight-semibold">
                    BILL TO
                  </p>

                  <AddressDescription address={order?.billing_address} />
                </div>
              )}
            </div>
          </div>

          {/* Metadata section */}
          <MetadataEditor
            id={order?.id}
            object_type={MetadataObjectTypeEnum.order}
            metadata={order?.metadata}
          >
            <MetadataEditorContext.Consumer>
              {({ isEditing, editMetadata }) => (
                <>
                  <div className="is-flex is-justify-content-space-between">
                    <h2 className="title is-5 my-4">Metadata</h2>

                    <button
                      type="button"
                      className="button is-default is-small is-align-self-center"
                      disabled={isEditing}
                      onClick={() => editMetadata()}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-pen"></i>
                      </span>
                      <span>Edit metadata</span>
                    </button>
                  </div>

                  <hr className="mt-1 mb-2" style={{ height: "1px" }} />
                </>
              )}
            </MetadataEditorContext.Consumer>
          </MetadataEditor>

          <div className="my-6 pt-1"></div>

          {/* Shipments section */}
          <h2 className="title is-5 my-4">Shipments</h2>

          {(order?.shipments || []).length == 0 && <div>No shipments</div>}

          {(order?.shipments || []).length > 0 && (
            <div
              className="table-container"
              style={{ maxHeight: "20em", overflow: "auto" }}
            >
              <table className="related-item-table table is-hoverable is-fullwidth">
                <tbody>
                  {(order?.shipments || []).map((shipment) => (
                    <tr key={shipment.id} className="items is-clickable">
                      <td className="status is-vcentered p-0 px-2">
                        <AppLink
                          href={`/shipments/${shipment.id}`}
                          className="pr-2"
                        >
                          <StatusBadge
                            status={shipment.status as string}
                            style={{ width: "80%" }}
                          />
                        </AppLink>
                      </td>
                      <td className="description is-vcentered p-0 px-2">
                        <AppLink
                          href={`/shipments/${shipment.id}`}
                          className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-2"
                        >
                          {shipment.id}
                          {shipment.tracking_number &&
                            ` - ${shipment.tracking_number}`}
                        </AppLink>
                      </td>
                      <td className="date is-vcentered p-0 px-2">
                        <AppLink
                          href={`/shipments/${shipment.id}`}
                          className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-2"
                        >
                          <span>{formatDateTime(shipment.created_at)}</span>
                        </AppLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="my-6 pt-1"></div>

          {/* Logs section */}
          <h2 className="title is-5 my-4">Logs</h2>

          {logs.isFetching && <Spinner />}

          {logs.isFetched && (logs.data?.logs.edges || []).length == 0 && (
            <div>No logs</div>
          )}

          {logs.isFetched && (logs.data?.logs.edges || []).length > 0 && (
            <div
              className="table-container"
              style={{ maxHeight: "20em", overflow: "auto" }}
            >
              <table className="related-item-table table is-hoverable is-fullwidth">
                <tbody>
                  {(logs.data?.logs.edges || []).map(({ node: log }) => (
                    <tr key={log.id} className="items is-clickable">
                      <td className="status is-vcentered p-0 px-2">
                        <AppLink
                          href={`/developers/logs/${log.id}`}
                          className="pr-2"
                        >
                          <StatusCode code={log.status_code as number} />
                        </AppLink>
                      </td>
                      <td className="description is-vcentered p-0 px-2">
                        <AppLink
                          href={`/developers/logs/${log.id}`}
                          className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-2"
                        >
                          {`${log.method} ${log.path}`}
                        </AppLink>
                      </td>
                      <td className="date is-vcentered p-0 px-2">
                        <AppLink
                          href={`/developers/logs/${log.id}`}
                          className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-2"
                        >
                          <span>{formatDateTime(log.requested_at)}</span>
                        </AppLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="my-6 pt-1"></div>

          {/* Events section */}
          <h2 className="title is-5 my-4">Events</h2>

          {events.isFetching && <Spinner />}

          {events.isFetched &&
            (events.data?.events.edges || []).length == 0 && (
              <div>No events</div>
            )}

          {events.isFetched && (events.data?.events.edges || []).length > 0 && (
            <div
              className="table-container"
              style={{ maxHeight: "20em", overflow: "auto" }}
            >
              <table className="related-item-table table is-hoverable is-fullwidth">
                <tbody>
                  {(events.data?.events.edges || []).map(({ node: event }) => (
                    <tr key={event.id} className="items is-clickable">
                      <td className="description is-vcentered p-0 px-2">
                        <AppLink
                          href={`/developers/events/${event.id}`}
                          className="is-size-7 has-text-weight-semibold has-text-grey is-flex py-2"
                        >
                          {`${event.type}`}
                        </AppLink>
                      </td>
                      <td className="date is-vcentered p-0 px-2">
                        <AppLink
                          href={`/developers/events/${event.id}`}
                          className="is-size-7 has-text-weight-semibold has-text-grey is-flex is-justify-content-right py-2"
                        >
                          <span>{formatDateTime(event.created_at)}</span>
                        </AppLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {query.isFetched && isNone(order) && (
        <div className="card my-6">
          <div className="card-content has-text-centered">
            <p>Uh Oh!</p>
            <p>{"We couldn't find any order with that reference"}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <OrderComponent orderId={params.id} />
    </>
  );
}
