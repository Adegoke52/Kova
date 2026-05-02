"use client";

import { useEffect } from "react";

export function TrackOpen({ token }: { token: string }) {
  useEffect(() => {
    // Fire and forget open tracking
    fetch(`/api/invoices/${token}/open`, { method: "POST" }).catch(console.error);
  }, [token]);

  return null;
}
