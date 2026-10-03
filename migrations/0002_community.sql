-- Public, unowned community data. Identity is a Solana wallet pubkey, never a login.
-- No personal names, emails, or free-text profiles.

create table if not exists activity_events (
  id          serial primary key,
  kind        text not null,
  source      text not null default 'app',
  wallet      text,
  created_at  timestamptz not null default now()
);

create index if not exists activity_events_created_idx
  on activity_events (created_at desc);

create table if not exists skill_scores (
  id           serial primary key,
  wallet       text not null,
  score        integer not null,
  buoys        integer not null default 0,
  duration_ms  integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists skill_scores_score_idx
  on skill_scores (score desc, created_at desc);

create index if not exists skill_scores_wallet_idx
  on skill_scores (wallet, created_at desc);
