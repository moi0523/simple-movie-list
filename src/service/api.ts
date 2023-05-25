import ky from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';
import { isString } from 'lodash';
import { isBrowserContext } from '@helper/isBrowserContext';
import { getSearchParams } from '@helper/getSerchParams';

type ExtendedKyInstance = {
  injectedUUID: string | null;
  injectedAuthorization: string | null;
  isAuthPending: boolean;
} & KyInstance;

const API = ky.create({
  prefixUrl: process.env['NEXT_PUBLIC_API_END_POINT'],
  retry: 0,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (isBrowserContext() && !API.injectedAuthorization) {
          if (isString(getSearchParams('accessToken'))) {
            request.headers.set(
              'Authorization',
              `Bearer ${getSearchParams('accessToken')}`,
            );
          } else if (window.localStorage['accessToken']) {
            request.headers.set(
              'Authorization',
              `Bearer ${window.localStorage['accessToken']}`,
            );
          }
        } else {
          request.headers.set(
            'Authorization',
            `Bearer ${API.injectedAuthorization}`,
          );

          API.injectedAuthorization = null;
        }
      },
    ],
    beforeError: [
      (error) => {
        const { response } = error;

        // add error tracking tool
        console.log(
          new Error(`
          status: ${response.status},
          calledURL: ${response.url},
          ${error}
        `),
        );

        return error;
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 204) {
          return new Response(JSON.stringify({ data: [] }), { status: 204 });
        }

        if (response.status === 401) {
          return new Response(JSON.stringify({ data: [] }));
        }

        if (response.status === 400) {
          const data = await response.json();

          if (data.message) {
            return new Response(
              JSON.stringify({
                status: 400,
                message: data.message,
                data: data.data,
              }),
            );
          }
        }

        return response;
      },
    ],
  },
}) as ExtendedKyInstance;

export { API };
