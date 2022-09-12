# Project Overview

## Kenzie Love is an application designed to connect people through their common interests.

<br>

The development process of this project prioritized creating a **flexible** and **user-friendly** environment, always taking into account their **security**.

<br>

In its basic use the user needs to fill the profile information, being able to add photos, personal interests and **express what they're looking for in their connections**, be it a serious or casual relationship, even simple friendship. In this way the algorithm will return the best match option based on the information passed in the profile.

<br>

<br>

---

<br>

## Built With

- [Express](https://www.npmjs.com/package/express)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cloudinary](https://cloudinary.com/)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [pg](https://www.npmjs.com/package/pg)
- [typeorm](https://typeorm.io/)
- [yup](https://www.npmjs.com/package/yup)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [class-validator](https://www.npmjs.com/package/class-validator)
- [dotenv](https://www.npmjs.com/package/dotenv)

<br>

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

<br>

## Prerequisites

- [Nodejs](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [PostgresSQL:14](https://www.postgresql.org/download/)

### Recommended

- [Visual Studio Code](https://code.visualstudio.com/Download) - IDE

---

## Installing

<br>

- **Clone repository**

```
git clone git@github.com:httTinder/httTinder-Api.git
```

- **Copy the environment variables**

```
 cp .env.example .env
```

- **Install dependencies**

```
npm install

yarn
```

- **Run the Migrations**

```
npm run typeorm migration:run -d src/data-source.ts

yarn typeorm migration:run -d src/data-source.ts
```

- **Start application**

```

npm run dev

yarn dev

```

## Usage

---

_For more examples, please refer to the [Documentation](https://htttinder.github.io/docs/)_

<!-- ## Collaborators

<a href="https://github.com/lmfreire"><img src="https://avatars.githubusercontent.com/u/67373130?v=4" /></a>
<a href="https://github.com/devigorgarcia"><img src="https://avatars.githubusercontent.com/u/19495297?v=4" /></a>
<a href="https://github.com/DiegoOlive29"><img src="https://avatars.githubusercontent.com/u/98782639?v=4" /></a>
<a href="https://github.com/fabiojcp"><img src="https://avatars.githubusercontent.com/u/98760788?v=4" /></a>
<a href="https://github.com/fjrjdev"><img src="https://avatars.githubusercontent.com/u/78241929?v=4" /></a>
<a href="https://github.com/Mapinko"><img src="https://avatars.githubusercontent.com/u/89092249?v=4" /></a> -->
