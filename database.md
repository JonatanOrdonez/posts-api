# Database Schema

The following tables must be created in the DB before running the application.

## Users

```sql
CREATE TABLE users (
    id int NOT NULL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
```

## Posts

```sql
CREATE TABLE posts (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    userId int NOT NULL REFERENCES users(id)
);
```
