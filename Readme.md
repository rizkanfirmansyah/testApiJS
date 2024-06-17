# OPEN API v1

## Installation Guide

Follow these steps to set up and run the OPEN API v1 project.

1. **Copy Environment Configuration**
   cp .env.example .env

2. **Fill in the Requirements in .env**
   Ensure that you fill in the necessary environment variables in the .env file.

3. **Install Packages**
npm run install
*or*
pnpm install

4. **Migrate Database**
pnpm db:migrate

5. **Seed Database**
pnpm db:seed


## Requirements

#### Node.js: v20.11
#### npm: v10.2 or 
#### pnpm: v8.15
#### PostgreSQL: v14
#### Drizzle: A lightweight ORM for SQL databases
#### Fastify: A web framework for Node.js
#### fastify-jwt: JWT plugin for Fastify
#### bcrypt: Library to hash passwords
