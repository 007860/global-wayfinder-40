import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/61572071016046/",
    Icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/albahr.travels/",
    Icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@albahrtravelconsultants",
    Icon: TikTokIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923434762264",
    Icon: WhatsAppIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mubashar-ali-0101b7452/",
    Icon: LinkedInIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@AlBahrHorizonTravels",
    Icon: YouTubeIcon,
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

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
