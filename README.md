# Project Overview

## Kenzie Love is an application designed to connect people through their common interests.

<br>

The development process of this project prioritized creating a **flexible** and **user-friendly** environment, always taking into account their **security**.

<br>

In its basic use the user needs to fill the profile information, being able to add photos, personal interests and **express what they're looking for in their connections**, be it a serious or casual relationship, even simple friendship. In this way the algorithm will return the best match option based on the information passed in the profile.

<br>

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

<br>

## Prerequisites

-   [Nodejs](https://nodejs.org/en/)
-   [Git](https://git-scm.com/downloads)
-   [PostgresSQL:14](https://www.postgresql.org/download/)

### Recommended

-   [Visual Studio Code](https://code.visualstudio.com/Download) - IDE

---

## Installing

-   **Clone repository**

```
git clone git@github.com:httTinder/httTinder-Api.git
```

-   **Copy the environment variables**

```
     cp .env.example .env
```

-   **Install dependencies**

```
npm install

yarn
```

-   **Run the Migrations**

```
npm run typeorm migration:run -d src/data-source.ts

yarn typeorm migration:run -d src/data-source.ts
```

-   **Start application**

```

npm run dev

yarn dev

```

<br>

---

<br>
<br>

# Collaborators

-   adicionar foto + link github
