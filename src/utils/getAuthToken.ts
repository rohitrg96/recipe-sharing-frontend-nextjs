// util/auth.ts
import { parseCookies } from 'nookies'; // For SSR
import Cookies from 'js-cookie'; // For CSR
import { GetServerSidePropsContext } from 'next';

/**
 * Get the auth token based on the rendering type (SSR or CSR).
 *
 * @param isServer - A flag indicating if the environment is SSR (true) or CSR (false).
 * @returns The authentication token or null.
 */
export const getAuthToken = (
  isServer: boolean,
  context: GetServerSidePropsContext | null
): string | null => {
  if (isServer) {
    // SSR: Retrieve the token from cookies using `nookies` (context-dependent)
    const cookies = parseCookies(context);
    return cookies.authToken;
  } else {
    // CSR: Retrieve the token from cookies using `js-cookie`
    return Cookies.get('authToken') || null;
  }
};
