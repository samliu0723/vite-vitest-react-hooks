// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET http://my-backend/fake-date" requests...
  http.get("http://my-backend/fake-date", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(["1", "2", "3"]);
  }),
];
