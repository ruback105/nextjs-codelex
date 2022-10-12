import { act, renderHook } from "@testing-library/react";
import useTimer from "../useTimer";

jest.useFakeTimers();

describe("useTimer", () => {
  const mins = 10;
  it("should work as a timer", () => {
    const { result } = renderHook(() => useTimer(mins));

    expect(result.current[1]).toEqual(mins * 60);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current[1]).toEqual(mins * 60 - 1);
  });
});
