"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

function parseMinutes(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) * 60 : 180;
}

export function BrewingTimer({ time }: { time: string }) {
  const initialSeconds = useMemo(() => parseMinutes(time), [time]);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="rounded-lg border border-brand-forest/10 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-forest">Brewing Timer</p>
          <p className="font-display text-4xl text-brand-dark">{minutes}:{secs}</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" size="icon" variant="gold" onClick={() => setRunning(true)} aria-label="Start brewing timer">
            <Play className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" onClick={() => { setRunning(false); setSeconds(initialSeconds); }} aria-label="Reset brewing timer">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
