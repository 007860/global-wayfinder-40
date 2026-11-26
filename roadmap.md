# Al-Bahr website update — November 2026 data migration

- [x] Jobs Abroad section, country pages, SEO overhaul (previous work).
- [ ] Migrate all listing data to database with draft/active/expired statuses + admin approval workflow.
- [x] Create database tables (umrah_packages, work_demands, tourist_visas, tour_packages, business_invitations, user_roles).
- [x] Seed 26 November Umrah packages (DRAFT, pending owner approval), 11 October packages backed up (active).
- [x] Seed work demands, tourist visas, tour packages, business invitations from transcription (DRAFT).
- [x] UmrahEngine reads packages from database instead of static file. (Done — `getUmrahPackages` in `src/lib/listings.functions.ts` reads the Supabase `umrah_packages` table, status = active.)
- [ ] New public category pages: /work-visas, /tourist-visas, /tours, /business-invitations, /visa-appointments, /hajj.
- [ ] Navigation restructured per brief (grouped categories).
- [ ] Secure admin dashboard (/admin): sign-in, role check, manage listings, status changes, search/filter.
- [ ] Sitemap + SEO for new pages.
- [ ] Verification report (duplicates, expired, missing info) + owner approval BEFORE making November packages public.
- [ ] After approval: set November packages active, archive October listings.
- [ ] Owner: upload the 3 original PDFs to fill "pending extraction" details (charges, benefits, requirements).
- [ ] Owner: admin login email/password (or approve account creation).
- [ ] Package poster upload in admin (needs storage bucket) — deferred.

## SEO / AEO pass (branch `seo-aeo-fixes`, Nov 2026)

- [x] Correct brand name everywhere: AL BAHR HORIZON TRAVELS AND CONSULTANTS.
- [x] Logo (`public/logo.png`) as header logo, favicon and Open Graph image.
- [x] TravelAgency + FAQPage + BreadcrumbList JSON-LD; focus-city areaServed (Lahore, Islamabad, Bahawalnagar, Marla Chowk, Sahiwal, Pakpattan).
- [x] SSR blog loading so crawlers see the briefs (`getBlogs` server function).
- [x] Correct social links (Facebook Page, Instagram @albahr.travels, TikTok @albahrtravelconsultants); main contact email standardised to albahrtravelconsultants@gmail.com (medical address kept for medical appointments only).
- [x] Expired Umrah departures filtered out automatically (client-side date filter in UmrahEngine).
- [ ] UmrahEngine: add a DB-level date filter so departed packages never appear (the patch adds a client-side filter only).
- [ ] Add testimonials section (real customer reviews only — never invent).
- [ ] Google Business Profile: create/claim listing with the same name, address, phone, hours and website, and set the map pin.
- [ ] Google Search Console: request re-indexing of fixed pages after the SEO PR merges.
- [ ] Facebook Page username: retry choosing `albahr.travels` once the Page qualifies (Facebook currently refuses).
- [ ] Instagram: add website link https://www.albahrtravels.com via the mobile app (web link editing is disabled).
- [ ] SECP registration number: add it to the site if the owner supplies it — do not invent one.
