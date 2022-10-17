# Individual Project (Henry) - Countries-Api

## Objetivos Realizados en este Proyecto

- Build an App using React, Redux, Node & Sequelize.
- Connect the learned skills as a FullStack developer.
- Learn and improve new & better skills.
- Learn and practice GIT & GITHUB workflow.
- Using and making testing.

The main idea is to create an application in which different countries & its data can be seen along with relevant information about them using the external api [restcountries](https://restcountries.com) and from it, be able to make:
- Search countries.
- Filter & order them.
- Create activities for each country.

#### This app was developed with:
- Main Lang: JavaScript.
- Back-End: nodeJS, ExpressJS & Sequelize.
- Data Base: PostgreSQL.
- Front-End: React, Redux, HTML, Pure CSS & Sass.
- Testing: Mocha & Chai.

#### Starting:
In `api` create a file called: `.env` following the form below:

```env
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
```

Replace `user` & `password` with your own postgres credentials.
Additionally, it will be necessary to create a database from psql called `countries`

Then, start the project following the commands below:
1. npm install
2. npm start

Both commands must be executed at `/api` & `/client`

