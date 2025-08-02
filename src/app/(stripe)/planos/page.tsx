"use client";

import { Plans } from "@/components/subscription/plans";

export default function Subscriptions() {
  return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <Plans />
        </div>
      </div>
  );
}