# Project Overview

Nosso projeto

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- [Nodejs](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [PostgresSQL:14](https://www.postgresql.org/download/)

### Recommended

- [Visual Studio Code](https://code.visualstudio.com/Download) - IDE

## Installing

Clone repository

```
git clone git@github.com:httTinder/httTinder-Api.git
```

Copy the environment variables

```
cp .env.example .env
```

Install dependencies

```
npm install

yarn
```

Run the Migrations

```
npm run typeorm migration:run -d src/data-source.ts

yarn typeorm migration:run -d src/data-source.ts
```

Start application

```

npm run dev

yarn dev

```
