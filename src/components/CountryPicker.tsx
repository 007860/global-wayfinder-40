import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Country } from "@/lib/countries";

type Props = {
  countries: Country[];
  onSelect: (name: string) => void;
  searchable?: boolean;
};

export function CountryPicker({ countries, onSelect, searchable = true }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return countries;
    return countries.filter(
      (c) => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term),
    );
  }, [countries, q]);

  return (
    <>
      {searchable && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search country…"
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-gold/60"
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => onSelect(c.name)}
            className="group glass rounded-xl p-4 text-left hover:bg-white/10 hover:border-gold/40 transition-all"
          >
            <div className="text-3xl mb-2">{c.flag}</div>
            <div className="font-medium text-sm group-hover:text-gold">{c.name}</div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-8">
            No countries match “{q}”.
          </p>
        )}
      </div>
    </>
  );
}
