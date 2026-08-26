import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/14mBvdkH4AA/",
    Icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/albahrtravelconsultants?igsi=c3p4b2U0dWRoMGk1",
    Icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@albahrtravelconsultants?_r=1&_t=ZS-99DEFljf86O",
    Icon: TikTokIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923434762264",
    Icon: WhatsAppIcon,
  },
];

export function SocialIcons({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {SOCIALS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={cn(
            "inline-flex items-center justify-center rounded-full p-2 text-gold transition-colors hover:text-gold-deep hover:bg-white/5",
            iconClassName
          )}
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.559 4.15 1.538 5.908L0 24l6.304-1.46A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.176 17.068c-.258.727-1.43 1.34-1.988 1.428-.503.08-1.097.112-1.77-.038-.408-.093-1.003-.24-1.718-.526-2.958-1.166-4.88-3.96-5.024-4.14-.144-.18-1.197-1.592-1.197-3.04 0-1.45.757-2.151 1.026-2.444.27-.293.59-.366.79-.366.198 0 .397.002.57.01.173.009.407-.066.633.48.227.549.775 1.89.844 2.026.07.137.116.297.023.48-.092.184-.138.298-.276.458-.138.16-.29.335-.413.45-.137.127-.28.265-.122.52.158.256.7 1.15 1.503 1.86 1.034.92 1.89 1.21 2.286 1.34.397.132.63-.054.724-.2.096-.145.413-.48.522-.648.11-.168.22-.14.367-.084.148.055.95.45 1.113.53.164.08.273.12.313.187.04.068.03.39-.1 1.09z" />
    </svg>
  );
}
