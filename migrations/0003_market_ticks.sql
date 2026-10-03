create table if not exists market_ticks (
  id           serial primary key,
  price_usd    double precision not null,
  volume_24h   double precision,
  market_cap   double precision,
  captured_at  timestamptz not null default now()
);

create index if not exists market_ticks_captured_idx
  on market_ticks (captured_at desc);
