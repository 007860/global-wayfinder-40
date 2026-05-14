import { Stethoscope, Globe2, Plane, Hotel } from "lucide-react";

export type ServiceKey = "medical" | "visa" | "flight" | "hotel";

export const SERVICES: {
  key: ServiceKey;
  icon: typeof Stethoscope;
  label: string;
}[] = [
  { key: "medical", icon: Stethoscope, label: "Medical Appointment Booking" },
  { key: "visa", icon: Globe2, label: "Visa Services" },
  { key: "flight", icon: Plane, label: "Flight Booking" },
  { key: "hotel", icon: Hotel, label: "Hotel Booking" },
];

type Props = {
  onSelect: (key: ServiceKey, label: string) => void;
};

export function ServicePills({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {SERVICES.map(({ key, icon: Icon, label }) => (
        <button
          type="button"
          key={key}
          onClick={() => onSelect(key, label)}
          className="glass rounded-full px-5 py-2.5 flex items-center gap-2.5 text-sm font-medium hover:bg-white/10 hover:border-gold/40 cursor-pointer"
        >
          <Icon className="size-4 text-gold" strokeWidth={2.2} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
