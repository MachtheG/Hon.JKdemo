"use client";

import { useSyncExternalStore } from "react";

/** One shared 1-second clock for every countdown on the page. */
const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(onTick: () => void) {
  listeners.add(onTick);
  if (timer === undefined) {
    timer = window.setInterval(() => listeners.forEach((l) => l()), 1000);
  }
  return () => {
    listeners.delete(onTick);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}
// Whole seconds keep the snapshot stable between ticks.
const getSnapshot = () => Math.floor(Date.now() / 1000) * 1000;
const getServerSnapshot = () => null;

/** Current time in ms, updated every second on the client; null during server render. */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
