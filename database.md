# Database Schema

The following tables must be created in the DB before running the application.

## Users

```sql
CREATE TABLE users (
    id UUID NOT NULL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NULL,
    address TEXT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);
```

## Users SQL Queries

### getUserById

```sql
SELECT * FROM users WHERE id = $1;
```

### authenticateUser

```sql
SELECT * FROM users WHERE email = $1 AND password = $2;
```

### createUser

```sql
INSERT INTO users (id, email, name, address, password, role)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
```

### updateUser

```sql
UPDATE users
SET
    name = $2,
    address = $3
WHERE id = $1
RETURNING *;
```

### deleteUser

```sql
DELETE FROM users WHERE id = $1 RETURNING *;
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
