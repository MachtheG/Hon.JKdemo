"use client";

import { useSyncExternalStore } from "react";
import { daysUntil, ELECTION } from "./election";

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
};
const getSnapshot = () => daysUntil(ELECTION.isoStart);
const getServerSnapshot = () => null;

/** Live day count on the client; null during server render (pages stay static). */
export function useDaysToElection(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
