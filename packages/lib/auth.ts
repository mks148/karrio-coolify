import { TokenObtainPair } from "@karrio/types/rest/api";
import { isNoneOrEmpty, url$ } from "./helper";
import { logger } from "./logger";
import axios from "axios";

export function computeTestMode(cookies: any, headers: any): boolean {
  const cookieTestMode = (
    (cookies.get("testMode")?.value as string) || ""
  ).toLowerCase();
  const urlTestMode = headers.get("referer")?.includes("/test") as boolean;

  if (cookieTestMode === "true" && urlTestMode) return true;
  if (cookieTestMode === "false" && !urlTestMode) return false;

  return urlTestMode;
}

export function Auth(HOST: string) {
  return {
    async authenticate(credentials: TokenObtainPair) {
      logger.debug("authenticating...");

      const { data } = await axios({
        url: url$`${HOST || ""}/api/token`,
        method: "POST",
        data: credentials,
      });

      return data;
    },
    async refreshToken(refreshToken: string) {
      if (isNoneOrEmpty(refreshToken)) {
        return Promise.reject("Missing refresh token!");
      }

      logger.debug("Send refresh token request...");

      const {
        data: { refresh, access },
      } = await axios({
        url: url$`${HOST || ""}/api/token/refresh`,
        method: "POST",
        data: { refresh: refreshToken },
      });
      return { access, refresh };
    },
    async getCurrentOrg(access: string, orgId?: string) {
      logger.debug("retrieving session org...");

      return axios({
        url: url$`${HOST || ""}/graphql`,
        method: "POST",
        data: { query: `{ organizations { id } }` },
        headers: { authorization: `Bearer ${access}` },
      })
        .then(({ data: { data } }) => {
          return (
            (data?.organizations || []).find(({ id }: any) => id === orgId) ||
            (data?.organizations || [{ id: null }])[0]
          );
        })
        .catch(({ data }) => {
          logger.error(data);
          return { id: null };
        });
    },
  };
}
