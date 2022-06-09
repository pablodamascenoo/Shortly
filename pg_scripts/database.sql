
create table users (
id serial primary key,
name text unique not null,
email text unique not null,
password text not null,
"createdAt" timestamp not null default now()
);

create table sessions (
id serial primary key,
"userId" integer not null references "user"("id"),
"createdAt" timestamp not null default now()
);

create table urls (
id serial primary key,
"shortUrl" text not null,
url text not null,
"userId" integer not null references "users"("id"),
views integer not null default 0,
"createdAt" timestamp not null default now()
);
