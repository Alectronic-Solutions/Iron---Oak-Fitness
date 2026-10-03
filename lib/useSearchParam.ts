"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Reads one query-string value on the client; `null` during SSR/hydration.
 *  The site is a static export, so `useSearchParams` would force the whole
 *  component out of the prerendered HTML - this keeps it in. */
export function useSearchParam(name: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}
