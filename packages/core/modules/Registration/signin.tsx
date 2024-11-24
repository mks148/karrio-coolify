"use client";
import { dynamicMetadata } from "@karrio/core/components/metadata";
import { FieldInfo } from "@karrio/ui/components/field-info";
import { useAPIMetadata } from "@karrio/hooks/api-metadata";
import { useSearchParams } from "next/navigation";
import { getCookie, isNone } from "@karrio/lib";
import { useForm } from "@tanstack/react-form";
import { signIn } from "next-auth/react";
import { p } from "@karrio/lib";
import Link from "next/link";
import React from "react";

export const generateMetadata = dynamicMetadata("Sign In");

export default function Page(pageProps: any) {
  const { metadata } = useAPIMetadata();
  const searchParams = useSearchParams();
  const form = useForm({
    defaultValues: {
      email: searchParams.get("email") || "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const orgId = getCookie("orgId");
      const response: any = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
        ...(!!orgId ? { orgId } : {}),
      });

      if (response.ok) {
        setTimeout(
          () => window.location.replace(p`${searchParams.get("next") || "/"}`),
          500,
        );
      }
    },
  });

  return (
    <>
      <div className="card isolated-card">
        <div className="card-content">
          <p className="subtitle has-text-centered">Sign in to your account</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="field mt-6">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "An email is required" : undefined,
                }}
                children={(field) => {
                  return (
                    <>
                      <label className="label" htmlFor="id_email">
                        Email
                      </label>
                      <input
                        className="input"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        disabled={!isNone(searchParams.get("email"))}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>

            <div className="field mt-5">
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "An email is required" : undefined,
                }}
                children={(field) => {
                  return (
                    <>
                      <label className="label level" htmlFor="id_password">
                        <span>Password</span>
                        <Link
                          legacyBehavior
                          href="/password/reset/request"
                          passHref
                        >
                          <a className="is-size-7" tabIndex={-1}>
                            Forgot your password?
                          </a>
                        </Link>
                      </label>
                      <input
                        className="input"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>

            <div className="field mt-6">
              <div className="control">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={"button is-primary is-fullwidth"}
                    >
                      {isSubmitting ? "..." : "Sign in"}
                    </button>
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {metadata?.ALLOW_SIGNUP && (
        <div className="has-text-centered my-4 is-size-6">
          Dont have an account?{" "}
          <Link legacyBehavior href="/signup" passHref>
            <a>Sign Up</a>
          </Link>
        </div>
      )}
    </>
  );
}
