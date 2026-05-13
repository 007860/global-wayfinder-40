import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Counters = { traffic: number; consultations: number };

export function useCounters() {
  const [counters, setCounters] = useState<Counters>({
    traffic: 1420,
    consultations: 865,
  });

  useEffect(() => {
    let mounted = true;
    const incrementOnce = async () => {
      const key = "albahr_visit_logged";
      let alreadyLogged = false;
      try {
        alreadyLogged = sessionStorage.getItem(key) === "1";
      } catch {}
      if (!alreadyLogged) {
        try {
          await supabase.rpc("increment_counter", { counter_name: "total_traffic" });
          sessionStorage.setItem(key, "1");
        } catch {}
      }
      const { data } = await supabase
        .from("analytics_counters")
        .select("name,value");
      if (!mounted || !data) return;
      const t = data.find((d) => d.name === "total_traffic")?.value ?? 1420;
      const c = data.find((d) => d.name === "consultations_booked")?.value ?? 865;
      setCounters({ traffic: Number(t), consultations: Number(c) });
    };
    incrementOnce();
    return () => {
      mounted = false;
    };
  }, []);

  return counters;
}
