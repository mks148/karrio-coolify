"use client";
import { useUserMutation } from "@karrio/hooks/user";
import React, { useContext, useState } from "react";
import { NotificationType } from "@karrio/types";
import { Notify } from "../components/notifier";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface CloseAccountActionComponent
  extends React.InputHTMLAttributes<HTMLDivElement> {}

export const CloseAccountAction: React.FC<CloseAccountActionComponent> = ({
  children,
}) => {
  const router = useRouter();
  const mutation = useUserMutation();
  const { notify } = useContext(Notify);
  const [isActive, setIsActive] = useState<boolean>(false);

  const close = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsActive(false);
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await mutation.closeAccount.mutateAsync();
      signOut({
        callbackUrl:
          "/signin?next=" + window.location.pathname + window.location.search,
      });
      router.push("/signin");
    } catch (err: any) {
      notify({ type: NotificationType.error, message: err });
    }
  };

  return (
    <>
      <button
        className="button is-danger is-light"
        onClick={() => setIsActive(true)}
      >
        {children}
      </button>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <form className="modal-card" onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <h3 className="subtitle is-3">Close Account</h3>

            <div className="buttons my=2">
              <button
                className="button is-info is-light is-small"
                onClick={close}
              >
                Cancel
              </button>
              <input
                className="button is-danger is-small"
                type="submit"
                value="Close My Account"
              />
            </div>
          </section>
        </form>
        <button
          className="modal-close is-large has-background-dark"
          aria-label="close"
          onClick={close}
        ></button>
      </div>
    </>
  );
};
