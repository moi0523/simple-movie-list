import ky from 'ky';
import {KyInstance} from 'ky/distribution/types/ky';

type ExtendedKyInstance = {
  injectedUUID: string | null;
  injectedAuthorization: string | null;
  isAuthPending: boolean;
} & KyInstance;

const API = ky.create({
  prefixUrl: 'https://api.themoviedb.org/3',
  retry: 0,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (!API.injectedAuthorization) {
          request.headers.set(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmE1NTgzY2E1MzIyYjUxMTBkMWY0MjFhZDQ4ZWE3NyIsInN1YiI6IjY0NmRmYWEzOTY2MWZjMDE1NzM2YjhhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ALIaN8brZZiDcZY3SfjD87Mt-MPt4D0zbzSFi8PA1mI',
          );
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
