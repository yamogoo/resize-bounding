import { describe, test, expect } from "vitest";
import { useTimeout } from "./useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.clearAllTimers();
  });

  const MS = 1_000;

  test("should execute callback when timer ended", async () => {
    let isTimerEnded = false;

    const { start } = useTimeout(() => {
      isTimerEnded = true;
    }, MS);

    start();

    vi.advanceTimersByTime(MS);
    expect(isTimerEnded).toBeTruthy();
    expect(isTimerEnded).toMatchInlineSnapshot(`true`);
  });

  test("should stop timer", async () => {
    let isTimerEnded = false;

    const { start, stop } = useTimeout(() => {
      isTimerEnded = true;
    }, MS);

    start();
    stop();

    vi.advanceTimersByTime(MS);
    expect(isTimerEnded).toBeFalsy();
  });
});
