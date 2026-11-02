# Al-Bahr website update — November 2026 data migration

- [x] Jobs Abroad section, country pages, SEO overhaul (previous work).
- [ ] Migrate all listing data to database with draft/active/expired statuses + admin approval workflow.
- [x] Create database tables (umrah_packages, work_demands, tourist_visas, tour_packages, business_invitations, user_roles).
- [x] Seed 26 November Umrah packages (DRAFT, pending owner approval), 11 October packages backed up (active).
- [x] Seed work demands, tourist visas, tour packages, business invitations from transcription (DRAFT).
- [ ] UmrahEngine reads packages from database instead of static file.
- [ ] New public category pages: /work-visas, /tourist-visas, /tours, /business-invitations, /visa-appointments, /hajj.
- [ ] Navigation restructured per brief (grouped categories).
- [ ] Secure admin dashboard (/admin): sign-in, role check, manage listings, status changes, search/filter.
- [ ] Sitemap + SEO for new pages.
- [ ] Verification report (duplicates, expired, missing info) + owner approval BEFORE making November packages public.
- [ ] After approval: set November packages active, archive October listings.
- [ ] Owner: upload the 3 original PDFs to fill "pending extraction" details (charges, benefits, requirements).
- [ ] Owner: admin login email/password (or approve account creation).
- [ ] Package poster upload in admin (needs storage bucket) — deferred.
