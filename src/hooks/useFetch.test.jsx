import useFetch from "./useFetch";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../mocks/node";
import { http, HttpResponse, delay } from "msw";
import { beforeAll, afterAll, afterEach, test, expect } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should fetch data from a given URL", async () => {
  const mockUrl = "http://my-backend/fake-date";

  const { result } = renderHook(() => useFetch(mockUrl));

  // Check initial loading state
  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.data).toEqual(["1", "2", "3"]);
});

test("it should handle error when fetching data", async () => {
  const mockUrl = "http://my-backend/fake-date";

  server.use(
    http.get(mockUrl, () => {
      return new HttpResponse("some_error", { status: 500 });
    })
  );

  const { result } = renderHook(() => useFetch(mockUrl));

  // Check initial loading state
  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.error).toBe("Network response was not ok");
});

test("it should pass for long waiting response", async () => {
  const mockUrl = "http://my-backend/fake-date";
  server.use(
    http.get(mockUrl, async () => {
      await delay(500);
      return HttpResponse.json(["1", "2", "3"]);
    })
  );

  const { result } = renderHook(() => useFetch(mockUrl));

  // Check initial loading state
  expect(result.current.loading).toBe(true);
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.data).toEqual(["1", "2", "3"]);
});

test("it should abort when url change", async () => {
  const mockUrlSlow = "http://my-backend/fake-date";
  const mockUrlFast = "http://my-backend/fake-date/fast";
  server.use(
    http.get(mockUrlSlow, async () => {
      await delay(500);
      return HttpResponse.json(["1", "2", "3"]);
    })
  );

  server.use(
    http.get(mockUrlFast, async () => {
      return HttpResponse.json(["1", "2", "3", "4"]);
    })
  );

  const { result, rerender } = renderHook(({ url }) => useFetch(url), {
    initialProps: { url: mockUrlSlow },
  });
  // Check initial loading state
  expect(result.current.loading).toBe(true);
  rerender({ url: mockUrlFast });
  expect(result.current.loading).toBe(true);
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.data).toEqual(["1", "2", "3", "4"]);
});
