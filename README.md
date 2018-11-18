# API-Sigarra
This API aims to provide access to information present on FEUP's 
websystem SIGARRA, such as menus of the faculty's restaurants 
and bars, ERASMUS' vacancies, access to your personal information, 
timetable visualisation, and more. We use technologies such as NodeJS, 
Express, Mocha and Chai.
Made with ❤️  by NIAEFEUP.

## Prerequisites
1. Install the following software:
  - [`NodeJS`](http://nodejs.org/)
  - [`Yarn`](https://yarnpkg.com/)
  - [`Docker`](https://www.docker.com)
2. Install the package dependencies by running `yarn install`

## Running the code
To run the code, you'll need to first to build the images for both 
the application and the database services. To do that, run 
`docker-compose build`. After that, you can choose between running 
either the test environment or the production environment:

- `docker-compose up -f docker-compose.yml` runs 
the production environment;
- `docker-compose up -f docker-compose-test.yml` runs 
the tests;

