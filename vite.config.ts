// @lovable.dev/vite-tanstack-config already includes the framework/build plugins.
// We only add targeted overrides here.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Force a Nitro server build outside the Lovable sandbox so Vercel receives
  // a real SSR/server-functions deployment instead of a static-only Vite build.
  nitro: { preset: "vercel" },
  tanstackStart: {
    server: { entry: "server" },
  },
});
