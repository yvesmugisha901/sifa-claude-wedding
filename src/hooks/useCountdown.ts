import { useEffect, useState } from "react";

export type CountdownStatus = "upcoming" | "today" | "past";
export interface CountdownState { days: number; hours: number; minutes: number; seconds: number; status: CountdownStatus }

const SECOND = 1000, MINUTE = 60 * SECOND, HOUR = 60 * MINUTE, DAY = 24 * HOUR;

/** Pure calculation from absolute instants, so it is correct in any viewer time zone. */
export function computeCountdown(start: Date, dayEnd: Date, now = Date.now()): CountdownState {
  const diff = start.getTime() - now;
  if (diff > 0) {
    return {
      days: Math.floor(diff / DAY), hours: Math.floor((diff % DAY) / HOUR),
      minutes: Math.floor((diff % HOUR) / MINUTE), seconds: Math.floor((diff % MINUTE) / SECOND),
      status: "upcoming",
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0, status: now <= dayEnd.getTime() ? "today" : "past" };
}

export function useCountdown(start: Date, dayEnd: Date): CountdownState {
  const [state, setState] = useState(() => computeCountdown(start, dayEnd));
  useEffect(() => {
    const tick = () => setState(computeCountdown(start, dayEnd));
    tick();
    const id = window.setInterval(tick, SECOND);
    return () => window.clearInterval(id);
  }, [start, dayEnd]);
  return state;
}
