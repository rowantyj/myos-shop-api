# MYOS Coding Test - SHOP API

## Author

Rowan Tan

rowantyj@gmail.com

[LinkedIn Profile](https://www.linkedin.com/in/rowantyj)

# Disclaimer & Assumptions:

1. No authentication is needed.
1. No form validation is needed.
1. `.env` file is commited for smoother transition

# Getting Started

## Pre-installation

1. Ensure that you have Node, Postgres, Prisma.
1. Clone this project to your local machine.
1. Change directory to the project.
1. Create a localhost database `myos-shop` with default user `postgres` at `port=5432`

## Quick-Installation

give permission to execute the file if needed

```
sudo chmod +x setup.sh
```

run `./setup.sh`

---

## Manual installation

### Install the dependencies

```
npm install --legacy-peer-deps
```

### Init Prisma from schema

```
npm run prisma:generate
```

```
npm run prisma:push
```

### Seed the database

```
npx prisma db seed
```

### Start the process

```
npm run dev
```

#### After the server is running

You can access the API on [Graphql Server](http://localhost:4000/)

Please refer to Schema generated by Graphql for more detailed usage.

### Run the test

```
npm run test
```
