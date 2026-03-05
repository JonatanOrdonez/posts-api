# Database Schema

The following tables must be created in the DB before running the application.

## Posts

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    userId UUID NOT NULL
);
```

## Posts SQL Queries

### getPosts

```sql
SELECT * FROM posts;
```

### getPostById

```sql
SELECT * FROM posts WHERE id = $1;
```

### createPost

```sql
INSERT INTO posts (title, description, imageUrl, userId)
VALUES ($1, $2, $3, $4)
RETURNING *;
```

### updatePost

```sql
UPDATE posts
SET
    title = $1,
    description = $2,
    imageUrl = $3
WHERE id = $4
RETURNING *;
```

### deletePost

```sql
DELETE FROM posts WHERE id = $1;
```
