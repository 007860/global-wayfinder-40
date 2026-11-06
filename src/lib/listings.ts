import { queryOptions } from "@tanstack/react-query";
import {
  getUmrahPackages,
  getWorkDemands,
  getTouristVisas,
  getTours,
  getBusinessInvitations,
} from "./listings.functions";
import type { Tables } from "@/integrations/supabase/types";
import type { UmrahPkg } from "./umrah-packages";

export type UmrahRow = Tables<"umrah_packages">;
export type WorkDemandRow = Tables<"work_demands">;
export type TouristVisaRow = Tables<"tourist_visas">;
export type TourRow = Tables<"tour_packages">;
export type InvitationRow = Tables<"business_invitations">;

export const umrahPackagesQuery = queryOptions({
  queryKey: ["umrah-packages-active"],
  queryFn: () => getUmrahPackages(),
});
export const workDemandsQuery = queryOptions({
  queryKey: ["work-demands-active"],
  queryFn: () => getWorkDemands(),
});
export const touristVisasQuery = queryOptions({
  queryKey: ["tourist-visas-active"],
  queryFn: () => getTouristVisas(),
});
export const toursQuery = queryOptions({
  queryKey: ["tours-active"],
  queryFn: () => getTours(),
});
export const invitationsQuery = queryOptions({
  queryKey: ["invitations-active"],
  queryFn: () => getBusinessInvitations(),
});

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function monthLabel(iso: string | null): string {
  if (!iso) return "";
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m || m < 1 || m > 12) return "";
  return `${MONTHS[m - 1]} ${y}`;
}

function minOf(dist: string): number | null {
  const m = dist.match(/\d+/);
  return m ? Number(m[0]) : null;
}

/** Maps a database row to the shape the Umrah booking engine renders. */
export function toUmrahPkg(r: UmrahRow): UmrahPkg {
  const label = monthLabel(r.departure_date ?? null);
  const flightOptions = Array.isArray(r.flights) ? r.flights : [];
  const firstFlight = flightOptions[0];
  const nights =
    r.total_nights != null ? `${r.total_nights} Nights` : typeof firstFlight === "string" && firstFlight.includes("21") ? "21 Days" : "";
  return {
    id: r.id,
    no: r.pkg_no,
    posterNo: r.poster_no ?? null,
    sourceRef: r.source_ref ?? null,
    monthLabel: label,
    departureCity: r.departure_city,
    departureDate: r.departure_date ?? null,
    returnDate: r.return_date ?? null,
    totalNights: r.total_nights,
    makkahNights: r.makkah_nights,
    madinahNights: r.madinah_nights,
    route: r.route,
    series: label.startsWith("October") ? "oct" : label.startsWith("November") ? "nov" : "oct",
    airline: r.airline,
    makkah: {
      name: r.makkah_hotel,
      dist: r.makkah_distance || "Distance not stated",
      min: minOf(r.makkah_distance),
      note: undefined,
    },
    madinah: {
      name: r.madinah_hotel,
      dist: r.madinah_distance || "Distance not stated",
      min: minOf(r.madinah_distance),
      note: undefined,
    },
    flights: flightOptions.filter((flight): flight is string => typeof flight === "string"),
    prices: {
      sharing: Number(r.price_sharing),
      quad: Number(r.price_quad),
      triple: Number(r.price_triple),
      double: Number(r.price_double),
    },
    nightsLabel: nights || undefined,
    notes: r.notes ?? undefined,
    duplicateNote: r.duplicate_note ?? undefined,
  };
}

export const fmtDate = (iso: string | null) => {
  if (!iso) return "On request";
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${MONTHS[(m ?? 1) - 1]?.slice(0, 3)} ${y}`;
};
