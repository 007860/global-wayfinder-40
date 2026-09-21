import { useEffect, useState } from "react";
import { Activity, Radio, Signal, Zap } from "lucide-react";

type Node = {
  id: string;
  icon: typeof Radio;
  region: string;
  metric: string;
  value: () => string;
  tone: "green" | "gold";
};

const NODES: Node[] = [
  {
    id: "sa-med",
    icon: Activity,
    region: "Saudi Medical Center",
    metric: "Slot Occupancy",
    value: () => `${(78 + Math.floor(Math.random() * 15))}% Occupied`,
    tone: "green",
  },
  {
    id: "eu-visa",
    icon: Signal,
    region: "Europe Visa Pipeline",
    metric: "Consular Feed",
    value: () => (Math.random() > 0.15 ? "Processing Active" : "Queue Rebalancing"),
    tone: "green",
  },
  {
    id: "lhe-jed",
    icon: Zap,
    region: "Karachi ⇄ Jeddah Routing",
    metric: "Corridor Optimizer",
    value: () => (Math.random() > 0.2 ? "Live · Optimal" : "Live · Rerouting"),
    tone: "gold",
  },
  {
    id: "gcc-med",
    icon: Radio,
    region: "GCC Medical Fitness Grid",
    metric: "Uplink",
    value: () => `${(92 + Math.floor(Math.random() * 7))}.${Math.floor(Math.random() * 9)}% Uptime`,
    tone: "green",
  },
  {
    id: "sch-visa",
    icon: Signal,
    region: "Schengen Appointment Mesh",
    metric: "Latency",
    value: () => `${(120 + Math.floor(Math.random() * 60))}ms · Nominal`,
    tone: "green",
  },
  {
    id: "hotels",
    icon: Zap,
    region: "Makkah Hotel Inventory",
    metric: "Availability",
    value: () => `${(1200 + Math.floor(Math.random() * 400))} rooms live`,
    tone: "gold",
  },
];

export function LiveStatusTicker() {
  const [tick, setTick] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTick((n) => n + 1), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative border-y border-emerald-400/10 bg-[var(--midnight)]">
      {/* scanline overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(52,211,153,0.9) 3px, transparent 4px)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            </span>
            <p className="text-[11px] tracking-[0.35em] text-emerald-300/90 font-mono uppercase">
              Live Operational Status · Node Uplink
            </p>
          </div>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono hidden sm:block">
            SYS://al-bahr/ops · rev {tick.toString().padStart(4, "0")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" key={tick}>
          {NODES.map((n) => {
            const Icon = n.icon;
            const dot =
              n.tone === "gold"
                ? "bg-gold shadow-[0_0_10px_#F59E0B]"
                : "bg-emerald-400 shadow-[0_0_10px_#34d399]";
            const line =
              n.tone === "gold" ? "text-gold" : "text-emerald-300";
            return (
              <div
                key={n.id}
                className="glass rounded-lg border border-emerald-400/10 hover:border-emerald-400/30 transition-colors p-4 bg-black/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${n.tone === "gold" ? "bg-gold" : "bg-emerald-400"}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} />
                  </span>
                  <Icon className={`size-3.5 ${line}`} strokeWidth={2.2} />
                  <p className="text-[10px] tracking-[0.28em] uppercase font-mono text-muted-foreground">
                    {n.metric}
                  </p>
                </div>
                <p className="font-mono text-[13px] text-foreground/90 leading-tight truncate">
                  {n.region}
                </p>
                <p className={`mt-2 font-mono text-lg font-semibold tracking-tight ${line}`}>
                  {mounted ? n.value() : "—"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
