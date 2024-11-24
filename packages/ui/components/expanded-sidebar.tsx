"use client";
import { OrganizationDropdown } from "./organization-dropdown";
import { useAPIMetadata } from "@karrio/hooks/api-metadata";
import { useAppMode } from "@karrio/hooks/app-mode";
import { p, DASHBOARD_VERSION } from "@karrio/lib";
import { usePathname } from "next/navigation";
import { useUser } from "@karrio/hooks/user";
import React, { useRef } from "react";
import { AppLink } from "./app-link";
import Image from "next/image";

interface ExpandedSidebarComponent {}

export const ExpandedSidebar: React.FC<ExpandedSidebarComponent> = () => {
  const pathname = usePathname();
  const sidebar = useRef<HTMLDivElement>(null);
  const dismissAction = useRef<HTMLButtonElement>(null);
  const {
    query: { data: { user } = {} },
  } = useUser();
  const { testMode, basePath, switchMode } = useAppMode();
  const { metadata } = useAPIMetadata();
  const [showResourcesMenus, setShowResourcesMenus] = React.useState(false);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    sidebar.current?.classList.remove("is-mobile-active");
    dismissAction.current?.classList.remove("is-mobile-active");
  };
  const isActive = (path: string) => {
    if (path === basePath) return path === pathname;
    return pathname.includes(`${basePath}${path}`.replace("//", "/"));
  };
  const activeClass = (path: string) => (isActive(path) ? "is-active" : "");

  return (
    <div className="plex-sidebar" ref={sidebar}>
      <div className="sidebar-header pl-5 mb-2">
        {metadata && (
          <>
            {metadata.MULTI_ORGANIZATIONS && <OrganizationDropdown />}
            {!metadata.MULTI_ORGANIZATIONS && (
              <Image
                src={p`/icon.svg`}
                width={30}
                height={40}
                className="mt-1"
                alt="logo"
              />
            )}
          </>
        )}

        <button
          className="button sidebar-menu-button"
          onClick={dismiss}
          ref={dismissAction}
        >
          <span className="icon is-small">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
      <div
        className="sidebar-menu has-slimscroll py-2"
        style={{ height: "calc(100% - 60px)" }}
      >
        <AppLink
          href="/"
          className={"menu-item " + activeClass(basePath)}
          shallow={false}
          prefetch={false}
        >
          <i
            className={`fa fa-house pr-2 ${isActive(basePath) ? "" : "has-text-grey"}`}
          ></i>
          <span className="has-text-weight-bold">Home</span>
        </AppLink>

        <AppLink
          href="/shipments"
          className={"menu-item " + activeClass("/shipments")}
          shallow={false}
          prefetch={false}
        >
          <i
            className={`fa fa-truck pr-2 ${isActive("/shipments") ? "" : "has-text-grey"}`}
          ></i>
          <span className="has-text-weight-bold">Shipments</span>
        </AppLink>

        <AppLink
          href="/trackers"
          className={"menu-item " + activeClass("/trackers")}
          shallow={false}
          prefetch={false}
        >
          <i
            className={`fa fa-location-arrow pr-2 ${isActive("/trackers") ? "" : "has-text-grey"}`}
          ></i>
          <span className="has-text-weight-bold">Trackers</span>
        </AppLink>

        {metadata?.ORDERS_MANAGEMENT && (
          <>
            <AppLink
              href="/orders"
              className={"menu-item " + activeClass("/orders")}
              shallow={false}
              prefetch={false}
            >
              <i
                className={`fa fa-inbox pr-2 ${isActive("/orders") ? "" : "has-text-grey"}`}
              ></i>
              <span className="has-text-weight-bold">Orders</span>
            </AppLink>
          </>
        )}

        <AppLink
          href="/connections"
          className={"menu-item " + activeClass("/connections")}
          shallow={false}
          prefetch={false}
        >
          <i
            className={`fa fa-th-list pr-2 ${isActive("/connections") ? "" : "has-text-grey"}`}
          ></i>
          <span className="has-text-weight-bold">Carriers</span>
        </AppLink>

        {metadata?.WORKFLOW_MANAGEMENT && (
          <>
            <AppLink
              href="/workflows"
              className={"menu-item " + activeClass("/workflows")}
              shallow={false}
              prefetch={false}
            >
              <i
                className={`fa fa-bolt pr-2 ${isActive("/workflows") ? "" : "has-text-grey"}`}
              ></i>
              <span className="has-text-weight-bold">Automation</span>
            </AppLink>
          </>
        )}

        {/* Settings */}
        <AppLink
          href="/settings/account"
          className={"menu-item " + activeClass("/settings")}
          shallow={false}
          prefetch={false}
        >
          <i
            className={`fa fa-cog pr-2 ${isActive("/settings") ? "" : "has-text-grey"}`}
          ></i>
          <span className="has-text-weight-bold">Settings</span>
        </AppLink>

        <hr className="my-3 mx-3" style={{ height: "1px" }} />

        {testMode ? (
          <a className="menu-item mode-menu-item" onClick={switchMode}>
            <i className="fas fa-toggle-on pr-2"></i>
            <span className="mode-menu-item has-text-weight-bold">
              Viewing test data
            </span>
          </a>
        ) : (
          <a className="menu-item has-text-grey" onClick={switchMode}>
            <i className="fas fa-toggle-off pr-2"></i>
            <span className="has-text-weight-bold">View test data</span>
          </a>
        )}

        {/* Developers */}
        <AppLink
          href="/developers"
          className={"menu-item " + activeClass("/developers")}
          shallow={false}
          prefetch={false}
        >
          <i
            className={`fa fa-terminal pr-2 ${isActive("/developers") ? "" : "has-text-grey"}`}
          ></i>
          <span className="has-text-weight-bold">Developers</span>
        </AppLink>

        {/* Resources */}
        <a
          className="menu-item menu-item my-0"
          onClick={() => setShowResourcesMenus(!showResourcesMenus)}
        >
          <i className={`fa fa-book pr-2 has-text-grey`}></i>
          <span className="has-text-weight-bold">Resources</span>
        </a>

        {((process.browser && showResourcesMenus) ||
          pathname.includes("/resources")) && (
          <>
            <AppLink
              href="/resources/reference"
              className={
                "menu-item ml-5 " + activeClass("/resources/reference")
              }
              shallow={false}
              prefetch={false}
            >
              <span className="has-text-weight-semibold">API Reference</span>
            </AppLink>

            <AppLink
              href="/resources/graphiql"
              className={"menu-item ml-5 " + activeClass("/resources/graphiql")}
              shallow={false}
              prefetch={false}
            >
              <span className="has-text-weight-semibold">GraphQL</span>
            </AppLink>

            {metadata?.APP_NAME.includes("Karrio") && (
              <a
                className="menu-item ml-5"
                target="_blank"
                rel="noreferrer"
                href="https://docs.karrio.io"
              >
                <span>Guides</span>
                <span className="icon is-small is-size-7 mx-2">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </a>
            )}
          </>
        )}

        {/* Administration */}
        {metadata?.ADMIN_DASHBOARD && user?.is_staff && (
          <>
            <AppLink
              href="/admin"
              className="menu-item menu-item my-0"
              shallow={false}
              prefetch={false}
            >
              <i className={`fa fa-tools pr-2 has-text-grey`}></i>
              <span className="has-text-weight-bold">Administration</span>
            </AppLink>
          </>
        )}
      </div>
      <div style={{ position: "absolute", bottom: 10, left: 20, right: 20 }}>
        <span className="menu-item has-text-weight-semibold has-text-grey-light">
          Version: {DASHBOARD_VERSION}
        </span>
      </div>
    </div>
  );
};
