# Postgres as queue backend

## Goal

The goal of this project is to try to use postgres
as a queue backend. The idea is to use the `SKIP LOCKED`

## Usage

1. Get a postgres database, e.g. using docker:

 ```bash
 docker run --name postgres -e POSTGRES_PASSWORD=postgres -d postgres
 ```
   
2. Create a .env file containing database credentials

 ```bash
 POSTGRES_HOST=localhost
 POSTGRES_PORT=5432
 POSTGRES_USER=postgres
 POSTGRES_PASSWORD=postgres
 POSTGRES_DB=postgres
 ```

3. Initialize the database

```commandline
make migrate
```

4. Start the populate script to put messages to queue

 ```commandline
 make populate
 ```

5. Start the worker to consume messages from queue

```commandline
make consume
```