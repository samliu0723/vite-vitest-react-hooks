import { act, render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { test, vi, expect } from "vitest";

test("Button onClick", async () => {
  vi.useFakeTimers();
  render(<Button text="Click me" />);
  fireEvent.click(screen.getByText("Click me"));

  expect(screen.getByText("Click me")).toHaveAttribute("disabled");
  expect(screen.getByText("Click me")).toBeDisabled();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  act(() => {
    // vi.runAllTimers();
    vi.advanceTimersByTime(3000);
  });
  expect(screen.getByText("Click me")).not.toHaveAttribute("disabled");
  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
