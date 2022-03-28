## About
This is a simple nestjs starter template. It has an authentication module(Working with JWTs) and an Users module. The authentication is made with the user's email and password.
It also comes with class-validator and @nestjs/config, so it has everything to start a new NestJS API.

## Installation

```bash
$ yarn install
```
Then, create a .env on the root of the project, with the following keys:
TYPEORM_CONNECTION -> sql type(MariaDB, MySQL, PostgresSQL, etc)
TYPEORM_HOSTNAME
TYPEORM_USERNAME
TYPEORM_PASSWORD
TYPEORM_DATABASE
JWT_SECRET

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn start:prod
```

## Stay in touch

- My LinkedIn: https://www.linkedin.com/in/mdanl/
