create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  avatar_url text,
  email_verified boolean default false,
  has_password boolean default false,
  last_login timestamp,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists public.auth_credentials (
  email text primary key references public.profiles(email) on delete cascade,
  password_hash text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists public.users (
  id text primary key,
  name text,
  email text unique,
  email_verified timestamp with time zone,
  image text
);

create table if not exists public.accounts (
  user_id text not null references public.users(id) on delete cascade,
  type text not null,
  provider text not null,
  provider_account_id text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  primary key (provider, provider_account_id)
);

create table if not exists public.sessions (
  session_token text primary key,
  user_id text not null references public.users(id) on delete cascade,
  expires timestamp with time zone not null
);

create table if not exists public.verification_tokens (
  identifier text not null,
  token text not null,
  expires timestamp with time zone not null,
  primary key (identifier, token)
);
