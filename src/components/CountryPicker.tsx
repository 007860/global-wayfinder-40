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
    if (!searchable || !q.trim()) return countries;
    const needle = q.trim().toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(needle) || c.code.toLowerCase().includes(needle),
    );
  }, [q, countries, searchable]);

  return (
    <div>
      {searchable && (
        <div className="relative mb-4">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search country..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-gold/60 focus:bg-white/10 transition-colors"
          />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[55vh] overflow-y-auto pr-1">
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
          <div className="col-span-full text-center text-sm text-muted-foreground py-8">
            No countries match "{q}".
          </div>
        )}
      </div>
    </div>
  );
}
