-- ════════════════════════════════════════════════════════════════
--  Portfolio CMS — run this once in Supabase → SQL Editor → Run.
--  Safe to re-run: it only creates what's missing and refreshes policies.
-- ════════════════════════════════════════════════════════════════

-- ── 1. Admin access ───────────────────────────────────────────────
-- Only emails listed here can edit content. Change it if you log in
-- to the admin panel with a different email.
create table if not exists public.admin_users (
  email text primary key
);
alter table public.admin_users enable row level security;

insert into public.admin_users (email) values ('gulerana3205@gmail.com')
on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ── 2. Content tables ─────────────────────────────────────────────
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default '',
  status text default '',
  description text default '',
  tech text[] default '{}',
  image_url text default '',
  live_url text default '',
  github_url text default '',
  featured boolean default false,
  is_placeholder boolean default false,
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  description text default '',
  icon text default 'Monitor',
  items text[] default '{}',
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text default '',
  period text default '',
  description text default '',
  tags text[] default '{}',
  is_current boolean default false,
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text default '',
  stat text default '',
  stat_label text default '',
  period text default '',
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text default '',
  description text default '',
  url text default '',
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sub text default '',
  icon text default 'Rocket',
  in_dashboard boolean default false,
  dashboard_note text default '',
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.features (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text default '',
  description text default '',
  icon text default 'Layers',
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  icon text default 'Code2',
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Everyone can read published content; only the admin can change it.
do $$
declare t text;
begin
  foreach t in array array['projects','skill_groups','experiences','education','certifications','stats','features','process_steps']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (visible or public.is_admin())', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

alter table public.site_settings enable row level security;
drop policy if exists "public read" on public.site_settings;
create policy "public read" on public.site_settings for select using (true);
drop policy if exists "admin write" on public.site_settings;
create policy "admin write" on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;

-- ── 3. Visitor analytics ──────────────────────────────────────────
-- Anonymous: a random per-browser id, no IP addresses or personal data.
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text not null check (char_length(visitor_id) <= 64),
  path text default '/' check (char_length(path) <= 200),
  referrer text default '' check (char_length(referrer) <= 200),
  device text default '' check (char_length(device) <= 20)
);

create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text not null check (char_length(visitor_id) <= 64),
  name text not null check (char_length(name) <= 50),
  label text default '' check (char_length(label) <= 200)
);

create index if not exists page_views_created_at_idx on public.page_views (created_at);
create index if not exists events_created_at_idx on public.events (created_at);

alter table public.page_views enable row level security;
alter table public.events enable row level security;

drop policy if exists "anyone can log" on public.page_views;
create policy "anyone can log" on public.page_views for insert to anon, authenticated with check (true);
drop policy if exists "admin reads" on public.page_views;
create policy "admin reads" on public.page_views for select to authenticated using (public.is_admin());

drop policy if exists "anyone can log" on public.events;
create policy "anyone can log" on public.events for insert to anon, authenticated with check (true);
drop policy if exists "admin reads" on public.events;
create policy "admin reads" on public.events for select to authenticated using (public.is_admin());

grant insert on public.page_views, public.events to anon, authenticated;
grant select on public.page_views, public.events to authenticated;

-- One call returns everything the analytics dashboard needs (dates in Pakistan time).
create or replace function public.get_analytics(days int default 30)
returns json
language plpgsql stable security definer set search_path = public
as $$
declare
  tz constant text := 'Asia/Karachi';
  today date := (now() at time zone tz)::date;
  since timestamptz := ((today - (days - 1))::timestamp at time zone tz);
  result json;
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;

  with pv as (select * from public.page_views where created_at >= since),
       ev as (select * from public.events where created_at >= since)
  select json_build_object(
    'views', (select count(*) from pv),
    'visitors', (select count(distinct visitor_id) from pv),
    'today', (select count(*) from public.page_views
              where (created_at at time zone tz)::date = today),
    'all_time', (select count(*) from public.page_views),
    'daily', (
      select coalesce(json_agg(json_build_object('day', d.day, 'views', d.views, 'visitors', d.visitors) order by d.day), '[]'::json)
      from (
        select g::date as day,
               count(pv.id) as views,
               count(distinct pv.visitor_id) as visitors
        from generate_series((today - (days - 1))::timestamp, today::timestamp, interval '1 day') g
        left join pv on (pv.created_at at time zone tz)::date = g::date
        group by g
      ) d
    ),
    'referrers', (
      select coalesce(json_agg(r), '[]'::json) from (
        select coalesce(nullif(referrer, ''), 'Direct') as label, count(*) as count
        from pv group by 1 order by 2 desc limit 8
      ) r
    ),
    'devices', (
      select coalesce(json_agg(r), '[]'::json) from (
        select coalesce(nullif(device, ''), 'Unknown') as label, count(*) as count
        from pv group by 1 order by 2 desc
      ) r
    ),
    'clicks', (
      select coalesce(json_agg(r), '[]'::json) from (
        select label, count(*) as count
        from ev where name = 'click' group by 1 order by 2 desc limit 10
      ) r
    )
  ) into result;

  return result;
end;
$$;

revoke execute on function public.get_analytics(int) from public, anon;
grant execute on function public.get_analytics(int) to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ── 4. Image & file storage ───────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "portfolio admin upload" on storage.objects;
create policy "portfolio admin upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio' and public.is_admin());
drop policy if exists "portfolio admin update" on storage.objects;
create policy "portfolio admin update" on storage.objects for update to authenticated
  using (bucket_id = 'portfolio' and public.is_admin());
drop policy if exists "portfolio admin delete" on storage.objects;
create policy "portfolio admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio' and public.is_admin());
