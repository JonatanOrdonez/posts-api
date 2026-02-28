# Database Schema

The following tables must be created in the DB before running the application.

## Users

```sql
CREATE TABLE users (
    id UUID NOT NULL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    roles TEXT[]
);
```

## Posts

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    userId UUID NOT NULL REFERENCES users(id)
);
```
