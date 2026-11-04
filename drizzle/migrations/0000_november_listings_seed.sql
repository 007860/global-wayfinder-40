do $$ begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('admin', 'moderator', 'user');
  end if;
end $$;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create policy "Users can read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Admins can read all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can manage roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(), 'admin'::app_role)) with check (public.has_role(auth.uid(), 'admin'::app_role));

create table public.umrah_packages (
  id uuid primary key default gen_random_uuid(),
  pkg_no text not null,
  poster_no text,
  source_ref text,
  source_file text not null,
  source_page integer,
  airline text not null,
  route text not null,
  departure_city text not null default 'Lahore',
  departure_date date,
  return_date date,
  total_nights integer,
  makkah_nights integer,
  madinah_nights integer,
  makkah_hotel text not null,
  makkah_distance text not null default '',
  madinah_hotel text not null,
  madinah_distance text not null default '',
  price_sharing numeric not null,
  price_quad numeric not null,
  price_triple numeric not null,
  price_double numeric not null,
  currency text not null default 'PKR',
  flights jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft','active','expired','archived')),
  duplicate_note text,
  notes text,
  created_at timestamptz not null default now()
);
grant select on public.umrah_packages to anon, authenticated;
grant insert, update, delete on public.umrah_packages to authenticated;
grant all on public.umrah_packages to service_role;
alter table public.umrah_packages enable row level security;
create policy "Public can view active packages" on public.umrah_packages for select to anon, authenticated using (status = 'active');
create policy "Admins can view all packages" on public.umrah_packages for select to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can insert packages" on public.umrah_packages for insert to authenticated with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update packages" on public.umrah_packages for update to authenticated using (public.has_role(auth.uid(), 'admin'::app_role)) with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete packages" on public.umrah_packages for delete to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));

create table public.work_demands (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  job_title text not null,
  salary_text text,
  vacancies integer,
  eligibility text,
  experience text,
  benefits text,
  charges text not null default 'Contact for charges',
  advance_payment text,
  total_cost text,
  requirements text,
  notes text,
  status text not null default 'draft' check (status in ('draft','active','expired','archived')),
  source_file text,
  source_page integer,
  created_at timestamptz not null default now()
);
grant select on public.work_demands to anon, authenticated;
grant insert, update, delete on public.work_demands to authenticated;
grant all on public.work_demands to service_role;
alter table public.work_demands enable row level security;
create policy "Public can view active demands" on public.work_demands for select to anon, authenticated using (status = 'active');
create policy "Admins can view all demands" on public.work_demands for select to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can insert demands" on public.work_demands for insert to authenticated with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update demands" on public.work_demands for update to authenticated using (public.has_role(auth.uid(), 'admin'::app_role)) with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete demands" on public.work_demands for delete to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));

create table public.tourist_visas (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  visa_type text not null,
  duration_options text,
  processing_time text,
  documents text,
  charges text not null default 'Contact for charges',
  payment_options text,
  notes text,
  status text not null default 'draft' check (status in ('draft','active','expired','archived')),
  source_file text,
  source_page integer,
  created_at timestamptz not null default now()
);
grant select on public.tourist_visas to anon, authenticated;
grant insert, update, delete on public.tourist_visas to authenticated;
grant all on public.tourist_visas to service_role;
alter table public.tourist_visas enable row level security;
create policy "Public can view active visas" on public.tourist_visas for select to anon, authenticated using (status = 'active');
create policy "Admins can view all visas" on public.tourist_visas for select to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can insert visas" on public.tourist_visas for insert to authenticated with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update visas" on public.tourist_visas for update to authenticated using (public.has_role(auth.uid(), 'admin'::app_role)) with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete visas" on public.tourist_visas for delete to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));

create table public.tour_packages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  country text not null,
  duration_text text,
  travel_dates text,
  price_text text,
  inclusions jsonb not null default '[]'::jsonb,
  itinerary jsonb not null default '[]'::jsonb,
  notes text,
  status text not null default 'draft' check (status in ('draft','active','expired','archived')),
  source_file text,
  source_page integer,
  created_at timestamptz not null default now()
);
grant select on public.tour_packages to anon, authenticated;
grant insert, update, delete on public.tour_packages to authenticated;
grant all on public.tour_packages to service_role;
alter table public.tour_packages enable row level security;
create policy "Public can view active tours" on public.tour_packages for select to anon, authenticated using (status = 'active');
create policy "Admins can view all tours" on public.tour_packages for select to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can insert tours" on public.tour_packages for insert to authenticated with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update tours" on public.tour_packages for update to authenticated using (public.has_role(auth.uid(), 'admin'::app_role)) with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete tours" on public.tour_packages for delete to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));

create table public.business_invitations (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  service_text text not null,
  requirements text,
  charges text not null default 'Contact for charges',
  notes text,
  status text not null default 'draft' check (status in ('draft','active','expired','archived')),
  source_file text,
  source_page integer,
  created_at timestamptz not null default now()
);
grant select on public.business_invitations to anon, authenticated;
grant insert, update, delete on public.business_invitations to authenticated;
grant all on public.business_invitations to service_role;
alter table public.business_invitations enable row level security;
create policy "Public can view active invitations" on public.business_invitations for select to anon, authenticated using (status = 'active');
create policy "Admins can view all invitations" on public.business_invitations for select to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can insert invitations" on public.business_invitations for insert to authenticated with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can update invitations" on public.business_invitations for update to authenticated using (public.has_role(auth.uid(), 'admin'::app_role)) with check (public.has_role(auth.uid(), 'admin'::app_role));
create policy "Admins can delete invitations" on public.business_invitations for delete to authenticated using (public.has_role(auth.uid(), 'admin'::app_role));

-- ===================== SEED: 26 NOVEMBER UMRAH PACKAGES (DRAFT — pending owner approval) =====================
insert into public.umrah_packages
(pkg_no, poster_no, source_ref, source_file, source_page, airline, route, departure_city, departure_date, return_date, total_nights, makkah_nights, madinah_nights, makkah_hotel, makkah_distance, madinah_hotel, madinah_distance, price_sharing, price_quad, price_triple, price_double, flights, status, duplicate_note, notes)
values
('01','#708','UP-100794','NOVEMBER PACKAGES UMRAH.pdf',1,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-02','2026-11-21',19,11,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',258999,263999,272999,291999,'["9P 586 · Lahore 17:30 → Jeddah 21:45","9P 587 · Jeddah 22:45 → Lahore 05:35 (next day)"]','draft',null,'Makkah hotel distance not stated on source page 1. Hotel name includes Shuttle — shuttle service NOT confirmed from source.'),
('02','#684','UP-100768','NOVEMBER PACKAGES UMRAH.pdf',2,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-02','2026-11-21',19,11,8,'Anwar Al Rayan Makkah','1200 meters','Manazil Al Marjhaan Al Madina','1000 meters',269999,278999,292999,320999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('03','#697','UP-100783','NOVEMBER PACKAGES UMRAH.pdf',3,'Saudi Arabian Airlines','Islamabad → Jeddah → Islamabad','Islamabad','2026-11-02','2026-11-22',20,12,8,'Anwar Al Rayan Makkah','1200 meters','Manazil Al Marjhaan Al Madina','1000 meters',279999,288999,303999,333999,'["SV 727 · Islamabad → Jeddah 02:35–06:15","SV 722 · Jeddah → Islamabad 01:55–08:45"]','draft',null,null),
('04','#709','UP-100795','NOVEMBER PACKAGES UMRAH.pdf',4,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-05','2026-11-24',19,11,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',258999,264999,273999,292999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,'Makkah hotel distance not stated on source page 4.'),
('05','#685','UP-100769','NOVEMBER PACKAGES UMRAH.pdf',5,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-05','2026-11-24',19,11,8,'Anwar Al Rayan Makkah','1200 meters','Manazil Al Marjhaan Al Madina','1000 meters',269999,278999,292999,320999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('06','#710','UP-100796','NOVEMBER PACKAGES UMRAH.pdf',6,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-06','2026-11-26',20,12,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Shuqqaq Falah Awali / Nozol Falah Awali','500–600 meters',289999,302999,324999,369999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('07','#711','UP-100777','NOVEMBER PACKAGES UMRAH.pdf',7,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-07','2026-11-27',20,12,8,'Anwar Al Rayan Makkah','1200 meters','Manazil Al Marjhaan Al Madina','1000 meters',271999,280999,295999,325999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('08','#699','UP-100765','NOVEMBER PACKAGES UMRAH.pdf',8,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-07','2026-11-28',21,13,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Shuqqaq Falah Awali / Nozol Falah Awali','500–600 meters',297999,313999,336999,383999,'["SV 739 · Lahore → Jeddah","SV 734 · Jeddah → Lahore"]','draft',null,null),
('09','#698','UP-100784','NOVEMBER PACKAGES UMRAH.pdf',9,'Saudi Arabian Airlines','Islamabad → Jeddah → Islamabad','Islamabad','2026-11-07','2026-11-27',20,12,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Alkeram Aljadid / Alkiram Alfidi','350–400 meters',302999,316999,340999,389999,'["SV 727 · Islamabad → Jeddah","SV 722 · Jeddah → Islamabad"]','draft',null,null),
('10','#702','UP-100789','NOVEMBER PACKAGES UMRAH.pdf',10,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-07','2026-11-27',20,12,8,'Mathar Al Jewar Makkah','500–550 meters','Arjwan Al Madinah / Ismiler Markazia','250–300 meters',332999,355999,392999,466999,'["SV 735 · Lahore → Jeddah","SV 738 · Jeddah → Lahore"]','draft',null,null),
('11','#700','UP-100786','NOVEMBER PACKAGES UMRAH.pdf',11,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-08','2026-11-23',15,9,6,'Emaar Al Khair Golden Hotel Makkah','800 meters','Shuqqaq Falah Awali / Nozol Falah Awali','500–600 meters',288999,299999,318999,355999,'["SV 739 · Lahore → Jeddah","SV 734 · Jeddah → Lahore"]','draft',null,'Short 15-night package (9 Makkah + 6 Madinah).'),
('12','#688','UP-100772','NOVEMBER PACKAGES UMRAH.pdf',12,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-09','2026-11-28',19,11,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',258999,263999,272999,291999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,'Makkah hotel distance not stated on source page 12.'),
('13','#712','UP-100800','NOVEMBER PACKAGES UMRAH.pdf',13,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-09','2026-11-28',19,11,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Alkeram Aljadid / Alkiram Alfidi','350–400 meters',291999,305999,328999,375999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('14','#713','UP-100802','NOVEMBER PACKAGES UMRAH.pdf',14,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-10','2026-11-30',20,12,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Shuqqaq Falah Awali / Nozol Falah Awali','500–600 meters',289999,302999,324999,369999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('15','#705','UP-100791','NOVEMBER PACKAGES UMRAH.pdf',15,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-10','2026-11-30',20,12,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Shuqqaq Falah Awali / Nozol Falah Awali','500–600 meters',297999,310999,332999,377999,'["SV 739 · Lahore → Jeddah","SV 734 · Jeddah → Lahore"]','draft',null,null),
('16','#738','UP-100830','NOVEMBER PACKAGES UMRAH.pdf',16,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-12','2026-12-01',19,11,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',258999,264999,273999,292999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,'Makkah hotel distance not stated on source page 16.'),
('17','#717','UP-100808','NOVEMBER PACKAGES UMRAH.pdf',17,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-12','2026-12-02',20,12,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',266999,272999,281999,300999,'["SV 735 · Lahore → Jeddah","SV 738 · Jeddah → Lahore"]','draft','POSSIBLE DUPLICATE of Package #728 (UP-100819): identical advertised details, different package references. Flagged for manual approval — both records preserved.','Makkah hotel distance not stated on source page 17.'),
('18','#728','UP-100819','NOVEMBER PACKAGES UMRAH.pdf',18,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-12','2026-12-02',20,12,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',266999,272999,281999,300999,'["SV 735 · Lahore → Jeddah","SV 738 · Jeddah → Lahore"]','draft','POSSIBLE DUPLICATE of Package #717 (UP-100808): identical advertised details, different package references. Flagged for manual approval — both records preserved.','Makkah hotel distance not stated on source page 18.'),
('19','#714','UP-100804','NOVEMBER PACKAGES UMRAH.pdf',19,'Saudi Arabian Airlines','Islamabad → Jeddah → Islamabad','Islamabad','2026-11-12','2026-12-02',20,12,8,'Anwar Al Rayan Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',279999,288999,303999,333999,'["SV 723 · Islamabad → Jeddah","SV 726 · Jeddah → Islamabad"]','draft',null,'Makkah hotel distance not stated on source page 19.'),
('20','#737','UP-100829','NOVEMBER PACKAGES UMRAH.pdf',20,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-12','2026-12-01',19,11,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Shuqqaq Falah Awali / Nozol Falah Awali','500–600 meters',286999,299999,320999,362999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('21','#721','UP-100812','NOVEMBER PACKAGES UMRAH.pdf',21,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-13','2026-12-03',20,12,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',266999,272999,281999,300999,'["SV 735 · Lahore → Jeddah","SV 738 · Jeddah → Lahore"]','draft',null,'Makkah hotel distance not stated on source page 21.'),
('22','#739','UP-100831','NOVEMBER PACKAGES UMRAH.pdf',22,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-13','2026-12-03',20,12,8,'Anwar Al Rayan Makkah','1200 meters','Manazil Al Marjhaan Al Madina','1000 meters',271999,280999,295999,325999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('23','#740','UP-100832','NOVEMBER PACKAGES UMRAH.pdf',23,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-13','2026-12-03',20,12,8,'Al Juhani Ajyad Makkah / Shahab Delma 2','500–550 meters','Alkeram Aljadid / Alkiram Alfidi','350–400 meters',294999,308999,332999,381999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,null),
('24','#729','UP-100821','NOVEMBER PACKAGES UMRAH.pdf',24,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-13','2026-12-03',20,12,8,'Emaar Al Khair Golden Hotel Makkah','800 meters','Diyar Safa Madina','700–750 meters',298999,311999,334999,379999,'["SV 735 · Lahore → Jeddah","SV 738 · Jeddah → Lahore"]','draft',null,null),
('25','#742','UP-100834','NOVEMBER PACKAGES UMRAH.pdf',25,'Fly Jinnah','Lahore → Jeddah → Lahore','Lahore','2026-11-14','2026-12-04',20,12,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',258999,264999,273999,292999,'["9P 586 · Lahore → Jeddah","9P 587 · Jeddah → Lahore"]','draft',null,'Makkah hotel distance not stated on source page 25.'),
('26','#730','UP-100822','NOVEMBER PACKAGES UMRAH.pdf',26,'Saudi Arabian Airlines','Lahore → Jeddah → Lahore','Lahore','2026-11-14','2026-12-04',20,12,8,'Rawafed Al Asmiah Shuttle Hotel Makkah','','Manazil Al Marjhaan Al Madina','1000 meters',266999,272999,281999,300999,'["SV 735 · Lahore → Jeddah","SV 738 · Jeddah → Lahore"]','draft',null,'Makkah hotel distance not stated on source page 26.');

-- ===================== SEED: 11 OCTOBER 2026 PACKAGES (ACTIVE backup) =====================
insert into public.umrah_packages
(pkg_no, source_file, airline, route, departure_city, departure_date, return_date, makkah_hotel, makkah_distance, madinah_hotel, madinah_distance, price_sharing, price_quad, price_triple, price_double, flights, status, notes)
values
('Oct-01','Website backup — October 2026 listings','Saudia (SV 739 / SV 734)','Lahore → Jeddah → Lahore','Lahore','2026-10-22','2026-11-12','Anwar Al Rayan','1200m','Manazil Al Marjan','1500–2000m',266999,273999,286999,311999,'["22 Oct · LHE→JED 02:40–05:45 → 12 Nov · JED→LHE 02:10–08:45"]','active','Backed up from previous website data before November import.'),
('Oct-02','Website backup — October 2026 listings','Saudia (SV 739 / SV 738 / SV 732)','Lahore → Jeddah → Lahore','Lahore','2026-10-28','2026-11-17','Anwar Al Rayan','1200m','Manazil Al Marjan','1500–2000m',264999,272999,284999,308999,'["Option A: 28 Oct LHE→JED → 17 Nov JED→LHE","Option B: 31 Oct LHE→JED → 20 Nov JED→LHE"]','active','Backed up from previous website data. Return date shown for Option A.'),
('Oct-03','Website backup — October 2026 listings','Saudia (SV 739 / SV 734)','Lahore → Jeddah → Lahore','Lahore','2026-10-04','2026-10-24','Al Juhanni Ajyad','500–600m','Nozl Al Falah','550–650m',279999,290999,308999,344999,'["04 Oct · LHE→JED 02:40–05:45 → 24 Oct · JED→LHE 02:10–08:45"]','active','Backed up from previous website data before November import.'),
('Oct-04','Website backup — October 2026 listings','Saudia (SV 739 / SV 738)','Lahore → Jeddah → Lahore','Lahore','2026-10-07','2026-10-28','Al Juhanni Ajyad','500–600m','Alkaram Aljadid / Alkaram Alatif','350–400m',290999,303999,326999,371999,'["07 Oct · LHE→JED 02:40–05:45 → 28 Oct · JED→LHE 18:05–01:00"]','active','Backed up from previous website data before November import.'),
('Oct-05','Website backup — October 2026 listings','Saudia (SV 735 / 738 / 739 / 734 / 732)','Lahore → Jeddah → Lahore','Lahore','2026-10-16','2026-11-05','Al Juhanni Ajyad','500–600m','Alkaram Aljadid / Alkaram Alatif','350–400m',287999,300999,322999,366999,'["Option A: 16 Oct LHE→JED → 05 Nov JED→LHE","Option B: 17 Oct LHE→JED → 06 Nov JED→LHE","Option C: 18 Oct LHE→JED → 07 Nov JED→LHE","Option D: 21 Oct LHE→JED → 10 Nov JED→LHE"]','active','Backed up from previous website data. Return date shown for Option A.'),
('Oct-06','Website backup — October 2026 listings','Saudia (SV 739 / SV 734)','Lahore → Jeddah → Lahore','Lahore','2026-10-30','2026-11-19','Al Juhanni Ajyad','500–600m','Alkaram Aljadid / Alkaram Alatif','350–400m',287999,300999,322999,366999,'["30 Oct · LHE→JED 02:40–05:45 → 19 Nov · JED→LHE 02:10–08:45"]','active','Backed up from previous website data before November import.'),
('N-01','Website backup — October 2026 listings','Saudia','Lahore → Jeddah → Lahore','Lahore','2026-10-05','2026-10-24','Rawafed Al Asmiah','1500–2000m','Manazil Al Marjan','1500–2000m',253999,258999,265999,280999,'["SV739 05 Oct LHE→JED 02:40–05:45 → SV734 24 Oct JED→LHE 01:55–08:30","SV735 06 Oct LHE→JED 10:30–13:35 → SV738 25 Oct JED→LHE 17:15–23:55","SV739 06 Oct LHE→JED 02:40–05:45 → SV738 27 Oct JED→LHE 17:15–23:55","SV735 06 Oct LHE→JED 10:30–13:35 → SV738 26 Oct JED→LHE 17:15–23:55"]','active','Backed up from previous website data before November import.'),
('N-02','Website backup — October 2026 listings','Saudia','Lahore → Jeddah → Lahore','Lahore','2026-10-07','2026-10-28','Al Juhanni Ajyad','500–600m','Alkaram Aljadid / Alkaram Alatif','350–400m',287999,309999,322999,366999,'["SV739 07 Oct LHE→JED 02:40–05:45 → SV738 28 Oct JED→LHE 17:15–23:55","SV735 07 Oct LHE→JED 10:30–13:35 → SV738 27 Oct JED→LHE 17:15–23:55","SV735 09 Oct LHE→JED 10:30–13:35 → SV738 29 Oct JED→LHE 17:15–23:55","SV739 09 Oct LHE→JED 02:40–05:45 → SV732 30 Oct JED→LHE 09:30–16:30"]','active','Backed up from previous website data before November import.'),
('N-03','Website backup — October 2026 listings','Saudia','Lahore → Jeddah → Lahore','Lahore','2026-10-10','2026-10-30','Emaar Al Khair Golden','800–900m','Nozl Al Falah','550–650m',283999,295999,315999,356999,'["SV739 10 Oct LHE→JED 02:40–05:45 → SV734 30 Oct JED→LHE 02:10–08:45","SV735 10 Oct LHE→JED 10:30–13:35 → SV738 30 Oct JED→LHE 17:15–23:55","SV739 11 Oct LHE→JED 02:40–05:45 → SV734 31 Oct JED→LHE 02:10–08:45"]','active','Backed up from previous website data before November import.'),
('N-04','Website backup — October 2026 listings','Saudia','Lahore → Jeddah → Lahore','Lahore',null,null,'Al Juhanni Ajyad','500–600m','Nozl Al Falah','550–650m',279999,290999,308999,344999,'["Flight dates on request (from Lahore)"]','active','Backed up from previous website data before November import.'),
('N-05','Website backup — October 2026 listings','Saudia','Lahore → Jeddah → Lahore','Lahore',null,null,'Mather Al Jewar','500–550m','Arjawan Al Madina','250–300m',314999,334999,366999,432999,'["Flight dates on request (from Lahore)"]','active','Backed up from previous website data before November import.');

-- ===================== SEED: WORK DEMANDS (DRAFT) =====================
insert into public.work_demands
(country, job_title, salary_text, vacancies, eligibility, experience, benefits, charges, advance_payment, total_cost, requirements, notes, status, source_file, source_page)
values
('Saudi Arabia','Delivery Driver','SAR 2,000 / month',450,null,null,null,'Contact for charges',null,null,null,'Remaining requirements, food, accommodation and charges are on source PDF page 2 — pending original PDF upload. Do not treat as confirmed.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',2),
('Saudi Arabia','Female Waitress','SAR 1,600 / month',null,'Female · Age 21–35 · Spoken English required','5 years',null,'Contact for charges',null,null,null,'Original interview date 06 October 2026 — EXPIRED. Status pending new interview; do not publish until re-advertised.','expired','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Saudi Arabia','Chef','SAR 1,000 / month',null,null,null,null,'Contact for charges',null,null,null,'Food, accommodation, age and selection requirements are on the original poster — pending original PDF upload.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Saudi Arabia','Saudi Cook','SAR 1,500 / month',null,null,null,null,'Contact for charges',null,null,null,'Food, accommodation, work permit and payment terms from the European work visa file — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Saudi Arabia','Car Delivery Driver',null,null,null,null,null,'Contact for charges',null,null,null,'Advertisement contains vehicle-category-based salary and commission tiers. Commission must NOT be shown as guaranteed salary. Per-category details on source poster — pending original PDF upload.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Bahrain','Ice Cream Packing','BHD 140 / month',20,null,null,null,'Contact for charges',null,null,null,'Benefits and visa charges to be extracted from source poster — pending original PDF upload.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Bahrain','Cleaner / Housekeeping','BHD 130 / month',null,null,null,null,'Contact for charges',null,null,null,'Benefits and visa charges to be extracted from source poster — pending original PDF upload.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Bahrain','Bike Rider','BHD 200 / month',null,null,null,null,'Contact for charges',null,null,null,'Benefits and visa charges to be extracted from source poster — pending original PDF upload.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Turkey','General Worker','TRY 28,000 / month',null,'Male · Age 18–50',null,'Food & accommodation free · 8-hour duty · 1-year contract (renewable)','Contact for charges',null,null,null,'Flyer notice (verbatim): no fee is charged before the work permit is issued.','draft','Previous website flyer data (Turkey general workers)',null),
('Turkey','Garments Factory Worker','PKR 180,000 / month',null,null,null,'Free food · Legal visa · Best manpower handling · Limited seats','Contact for charges',null,null,null,'Advertised payment arrangement: 60% in Pakistan and 40% after arrival — subject to source verification. Percentages relate to the agency fee, NOT salary. Actual total fee not stated on flyer.','draft','Previous website flyer data (Turkey garments)',null),
('Turkey','Packing & Loading Worker','PKR 180,000 / month',null,null,null,null,'Contact for charges',null,null,null,'Exact duties and benefits per source flyer — pending original PDF verification.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Turkey','Biscuit Packing Worker','PKR 180,000 / month',null,'Ladies · Age 18–40 (age relaxation possible)',null,'Free food · Free accommodation · Direct hiring from Pakistan','Contact for charges',null,null,null,null,'draft','Previous website flyer data (Turkey biscuit packing)',null),
('Albania','Parlor & Hair Care','EUR 1,200–1,600 / month (advertised Albania range)',null,null,null,'Free accommodation (shared) · Food provided at work · Medical insurance · Transportation support · Legal work permit','Contact for charges',null,null,null,'Advertised salary range is for Albania demands overall — not confirmed identical for every individual role.','draft','Previous website flyer data (Albania work permit)',null),
('Albania','Cleaner','EUR 1,200–1,600 / month (advertised Albania range)',null,null,null,'Free accommodation (shared) · Food provided at work · Medical insurance · Transportation support · Legal work permit','Contact for charges',null,null,null,'Advertised salary range is for Albania demands overall — not confirmed identical for every individual role.','draft','Previous website flyer data (Albania work permit)',null),
('Albania','Helper','EUR 1,200–1,600 / month (advertised Albania range)',null,null,null,'Free accommodation (shared) · Food provided at work · Medical insurance · Transportation support · Legal work permit','Contact for charges',null,null,null,'Advertised salary range is for Albania demands overall — not confirmed identical for every individual role.','draft','Previous website flyer data (Albania work permit)',null),
('Albania','Restaurant Worker','EUR 1,200–1,600 / month (advertised Albania range)',null,null,null,'Free accommodation (shared) · Food provided at work · Medical insurance · Transportation support · Legal work permit','Contact for charges',null,null,null,'Advertised salary range is for Albania demands overall — not confirmed identical for every individual role.','draft','Previous website flyer data (Albania work permit)',null),
('Albania','Coffee / Bar Attendant','EUR 1,200–1,600 / month (advertised Albania range)',null,null,null,'Free accommodation (shared) · Food provided at work · Medical insurance · Transportation support · Legal work permit','Contact for charges',null,null,null,'Advertised salary range is for Albania demands overall — not confirmed identical for every individual role.','draft','Previous website flyer data (Albania work permit)',null),
('Albania','General Worker','EUR 1,200–1,600 / month (advertised Albania range)',null,null,null,'Free accommodation (shared) · Food provided at work · Medical insurance · Transportation support · Legal work permit','Contact for charges',null,null,null,'Advertised salary range is for Albania demands overall — not confirmed identical for every individual role.','draft','Previous website flyer data (Albania work permit)',null),
('Poland','Agriculture Worker',null,null,null,null,'Legal work permit · Accommodation provided · Food facility · Health insurance · Professional guidance','Contact for charges',null,null,null,'No salary stated in source advertisement — salary on request.','draft','Previous website flyer data (Poland work permit)',null),
('Poland','Restaurant Worker',null,null,null,null,'Legal work permit · Accommodation provided · Food facility · Health insurance · Professional guidance','Contact for charges',null,null,null,'No salary stated in source advertisement — salary on request.','draft','Previous website flyer data (Poland work permit)',null),
('Poland','Warehouse / Packing Worker',null,null,null,null,'Legal work permit · Accommodation provided · Food facility · Health insurance · Professional guidance','Contact for charges',null,null,null,'No salary stated in source advertisement — salary on request.','draft','Previous website flyer data (Poland work permit)',null),
('Poland','Construction Worker',null,null,null,null,'Legal work permit · Accommodation provided · Food facility · Health insurance · Professional guidance','Contact for charges',null,null,null,'No salary stated in source advertisement — salary on request.','draft','Previous website flyer data (Poland work permit)',null),
('Poland','Engineers / IT / Bankers — Professional Work Permit',null,null,'Males & females',null,'Easy step-by-step payment plan · 100% genuine jobs · Legal & safe process · Complete support','Contact for charges',null,null,null,'Professional-category work permit (engineering, IT, banking, construction, packing, restaurant, agriculture). Financial details on source poster — pending PDF.','draft','Previous website flyer data (Poland professional permit)',null),
('Greece','Work Permit & Visa Appointment Assistance',null,null,null,null,null,'Contact for charges',null,null,null,'Advertised: work permit assistance, one-year work permit, visa appointment assistance. September 2026 reserved appointment slots are EXPIRED — marked inactive.','expired','DEMAND FOR WORK VISA AND TOURISM.pdf',null),
('Greece & Cyprus','Hotel Waiter',null,null,'Age 20–35',null,null,'Contact for charges',null,null,null,'Advertised (source claims, not verified government guarantees): work permit 2 years extendable · processing 30–45 days · payment 50% on visa + 50% after arrival.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Greece & Cyprus','Hotel Supervisor',null,null,'Age 20–35',null,null,'Contact for charges',null,null,null,'Advertised (source claims, not verified government guarantees): work permit 2 years extendable · processing 30–45 days · payment 50% on visa + 50% after arrival.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Canada','Open Work Permit Program',null,null,null,null,null,'Contact for charges',null,'PKR 2,500,000 (advertised program cost — unverified)',null,'Validity advertised as 2 years, extendable. Advertised PROGRAM COST — not a government visa fee. Employer-specific opportunities must be kept separate from general immigration services.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Canada','Closed Work Permit Program',null,null,null,null,null,'Contact for charges',null,'PKR 4,000,000 (advertised program cost — unverified)',null,'Validity advertised as 2 years, extendable. Advertised PROGRAM COST — not a government visa fee.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Barbados','Agriculture Labor','BBD 2,000 / month',null,null,null,null,'Contact for charges','PKR 500,000 (advertised advance)',null,null,'Advertised: permit 1 year · processing 45 working days. Advance payment is SEPARATE from total program cost. Source claims not verified.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Barbados','Construction Labor','BBD 2,000 / month',null,null,null,null,'Contact for charges','PKR 500,000 (advertised advance)',null,null,'Advertised: permit 1 year · processing 45 working days. Advance payment is SEPARATE from total program cost.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Barbados','Dairy Farm Worker','BBD 2,000 / month',null,null,null,null,'Contact for charges','PKR 500,000 (advertised advance)',null,null,'Advertised: permit 1 year · processing 45 working days. Advance payment is SEPARATE from total program cost.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Barbados','Hospital Cleaner','BBD 2,000 / month',null,null,null,null,'Contact for charges','PKR 500,000 (advertised advance)',null,null,'Advertised: permit 1 year · processing 45 working days. Advance payment is SEPARATE from total program cost.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Italy','Work Visa (details pending extraction)',null,null,null,null,null,'Contact for charges',null,null,null,'Offer details on source poster (EUROPEAN WORK VISA AND OTHERS.pdf) — pending original PDF upload. No general European salary applied to this country.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Netherlands','Work Visa (details pending extraction)',null,null,null,null,null,'Contact for charges',null,null,null,'Offer details on source poster (EUROPEAN WORK VISA AND OTHERS.pdf) — pending original PDF upload. No general European salary applied to this country.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null),
('Norway','Work Visa (details pending extraction)',null,null,null,null,null,'Contact for charges',null,null,null,'Offer details on source poster (EUROPEAN WORK VISA AND OTHERS.pdf) — pending original PDF upload. No general European salary applied to this country.','draft','EUROPEAN WORK VISA AND OTHERS.pdf',null);

-- ===================== SEED: TOURIST & VISIT VISAS (DRAFT) =====================
insert into public.tourist_visas
(country, visa_type, duration_options, processing_time, documents, charges, payment_options, notes, status, source_file, source_page)
values
('Russia','Tourist & Visit Visa','15-day option · 1-month option · 3-month option','30 days (advertised)','Passport · Picture · ID Card · PCC','Contact for charges','Done Base & Advance Base (advertised)',null,'draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null);

-- ===================== SEED: INTERNATIONAL TOURS (DRAFT) =====================
insert into public.tour_packages
(title, country, duration_text, travel_dates, price_text, inclusions, itinerary, notes, status, source_file, source_page)
values
('Turkey New Year Special Tour','Turkey','7 days','27 December 2026 – 02 January 2027','PKR 299,000 / person (advertised)','["Visa Assistance","Return Air Ticket","Airport Transfers","3-Star Hotel","Daily Breakfast","Tours as per Itinerary"]','[{"day":"Day 1","detail":"Arrival in Istanbul"},{"day":"Day 2","detail":"Old City — Hagia Sophia, Blue Mosque, Sultanahmet"},{"day":"Day 3","detail":"Princess Islands Tour"},{"day":"Day 4","detail":"Bosphorus Dinner Cruise"},{"day":"Day 5","detail":"Taksim, Istiklal Street and New Year''s Eve"},{"day":"Day 6","detail":"Free Day — Shopping and Sightseeing"},{"day":"Day 7","detail":"Departure"}]','Only the inclusions listed in the source advertisement are shown. No extra inclusions assumed.','draft','DEMAND FOR WORK VISA AND TOURISM.pdf',null);

-- ===================== SEED: BUSINESS INVITATIONS (DRAFT) =====================
insert into public.business_invitations
(country, service_text, requirements, charges, notes, status, source_file)
values
('Netherlands','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf'),
('Hungary','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf'),
('Germany','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf'),
('Spain','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf'),
('Switzerland','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf'),
('Austria','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf'),
('Australia','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf'),
('Canada','Business Invitation Letter',null,'Contact for charges','Exact requirements and charges on source posters — pending original PDF upload.','draft','EUROPEAN WORK VISA AND OTHERS.pdf');