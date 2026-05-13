import { Stethoscope, Globe2, Plane, Hotel } from "lucide-react";

export const SERVICES = [
  { icon: Stethoscope, label: "Medical Appointment Booking" },
  { icon: Globe2, label: "Visa Services" },
  { icon: Plane, label: "Flight Booking" },
  { icon: Hotel, label: "Hotel Booking" },
];

export function ServicePills() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {SERVICES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="glass rounded-full px-5 py-2.5 flex items-center gap-2.5 text-sm font-medium"
        >
          <Icon className="size-4 text-gold" strokeWidth={2.2} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
