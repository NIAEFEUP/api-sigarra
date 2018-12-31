# API - SIGARRA

[![Build Status](https://img.shields.io/travis/NIAEFEUP/api-sigarra/develop.svg?style=for-the-badge)](https://travis-ci.org/NIAEFEUP/api-sigarra)
[![GitHub issues](https://img.shields.io/github/issues/NIAEFEUP/api-sigarra.svg?style=for-the-badge)](https://github.com/NIAEFEUP/api-sigarra/issues)
[![GitHub license](https://img.shields.io/github/license/NIAEFEUP/api-sigarra.svg?style=for-the-badge)](https://github.com/NIAEFEUP/api-sigarra/blob/develop/LICENSE)




This API aims to provide access to information present on FEUP's 
websystem SIGARRA, such as menus of the faculty's restaurants 
and bars, ERASMUS' vacancies, access to your personal information, 
timetable visualisation, and more. We use technologies such as NodeJS, 
Express, Mocha and Chai.
Made with ❤️  by NIAEFEUP.

## Installation

### Prerequisites

- [`Docker`](https://www.docker.com)
- [`Docker Compose`](https://www.docker.com)

### Installing Docker

The best approach to install `docker` is to follow the offical guide [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository). 

Please follow the steps in `Install using the repository` section.

Next, follow [these](https://docs.docker.com/install/linux/linux-postinstall/) steps to configure docker access with non sudo permissions in the `Manage Docker as a non-root user` section.

### Installing Docker Compose

The best approach to install `docker-compose` is to follow the offical guide [here](https://docs.docker.com/compose/install/#install-compose). 

## Usage

### Development
To start developing, you must create a file `.env` with environment variables, which are explained in more detail [below](#env-file-specification).

After creating the `.env` file, you must build a dev server. 

```bash
./dev.sh --build 
```
If you have already built the images/containers before you can simply run:
```bash
./dev.sh 
```

> The `dev.sh` file is available in the project's root folder

This will create a development server with hot reloading which will listen on http://localhost:3000 by default, unless you specify another port.

### Testing

To run the test suite, the workflow is similar to the development one.

```bash
./test.sh --build 
```
If you have already built the images/containers before you can simply run:

```bash
./test.sh 
```
> The `test.sh` file is available in the project's root folder

### Production Environment

The production environment is created by doing:

```bash
./prod.sh --build 
```
If you have already built the images/containers before you can simply run:

```bash
./prod.sh 
```
> The `prod.sh` file is available in the project's root folder

This environment doesn't have hot reloading and is made to be used in the main server which is running this aplication. 

### Env File Specification

- `HOST_PORT`= The port where you will access in your machine (http://localhost:<HOST_PORT>)
- `CONTAINER_PORT`= The port where the app will run inside the container (Can be the same as `HOST_PORT`)
- `MONGO_URI`= [Optional] Specify a URI for an external mongo database


## Project Details

This project uses `Node.js` with `Express.js` for the API routing and request-response logic. The DBMS used is Mongo, using Mongoose for the Node.js connection.

The testing is done with `Mocha` and `Chai`.

### Authors
The NIAEFEUP api-sigarra dev-team:
- [`André Rocha`](http://github.com/andrefmrocha);
- [`Ângelo Teixeira`](http://github.com/imnotteixeira);
- [`Carlos Nova Duarte`](http://github.com/carlosnovaduarte);
- [`Henrique Lima`](http://github.com/reeckset);
- [`José Silva`](http://github.com/krystalgamer);
- [`Miguel Duarte`](http://github.com/miguelpduarte);
- [`Tiago Fragoso`](http://github.com/tiagofragoso);
- [`Tiago Verdade`](http://github.com/Tiagocv64);

## License
[MIT](https://choosealicense.com/licenses/mit/)

[license]: LICENSE
