import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileCheck2, X } from "lucide-react";

type Props = {
  label: string;
  accept?: string;
  onFile?: (file: File | null) => void;
};

export function LaserDropzone({
  label,
  accept = "image/*,application/pdf",
  onFile,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (f: File | null) => {
      setFile(f);
      onFile?.(f);
      if (f) {
        setScanning(true);
        window.setTimeout(() => setScanning(false), 2200);
      }
    },
    [onFile],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const active = dragOver || scanning;

  return (
    <div className="mt-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        className={`relative overflow-hidden rounded-xl border cursor-pointer transition-colors select-none
          ${active
            ? "border-emerald-400/60 bg-emerald-400/[0.04]"
            : "border-dashed border-white/15 bg-white/[0.02] hover:border-emerald-400/40 hover:bg-emerald-400/[0.03]"}`}
        style={{ minHeight: 128 }}
      >
        {/* corner brackets */}
        <span className="pointer-events-none absolute top-1.5 left-1.5 w-4 h-4 border-t border-l border-emerald-400/70" />
        <span className="pointer-events-none absolute top-1.5 right-1.5 w-4 h-4 border-t border-r border-emerald-400/70" />
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 w-4 h-4 border-b border-l border-emerald-400/70" />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r border-gold/70" />

        {/* Laser scan line */}
        {active && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 h-[3px] laser-line"
            style={{
              background:
                "linear-gradient(90deg, transparent, #34d399 20%, #F59E0B 50%, #34d399 80%, transparent)",
              boxShadow:
                "0 0 14px 2px rgba(52,211,153,0.75), 0 0 40px 6px rgba(245,158,11,0.35)",
            }}
          />
        )}

        {/* Grid overlay */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(52,211,153,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex flex-col items-center justify-center px-5 py-6 text-center">
          {file ? (
            <>
              <FileCheck2 className="size-6 text-emerald-300 mb-2" />
              <p className="font-mono text-sm text-emerald-200 truncate max-w-full">
                {file.name}
              </p>
              <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mt-1">
                {scanning ? "Biometric Scan In Progress" : "Scan Complete · Ready"}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFile(null);
                }}
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-gold"
              >
                <X className="size-3" /> Remove
              </button>
            </>
          ) : (
            <>
              <UploadCloud className={`size-6 mb-2 ${active ? "text-emerald-300" : "text-gold"}`} />
              <p className="text-sm font-medium text-foreground/90">{label}</p>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                Drop file · initiate laser scan
              </p>
            </>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <style>{`
        @keyframes laser-sweep {
          0%   { top: 0%;   opacity: 0.2; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0.2; }
        }
        .laser-line {
          animation: laser-sweep 1.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}</style>
    </div>
  );
}
