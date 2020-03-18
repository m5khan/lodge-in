# lodge-in

Full-stack demo application for limehome to search for near by properties and book them using HERE location API. Based on Node.js, React, typescript and MongoDB.

## Demo

## Application Structure

Application has two folders front-end and backend stack.

- `src` folder
  - `src` folder contains the back-end implementation.
  - Backend is implemented in _Node.js_ with _Typescript_ and _MongoDB_ as a persistence layer. It uses _Express.js_ framework for MVC and _TypeDI_ for dependency injection.

- `app` folder
  - `app` folder contains the front-end code.
  - Front-end is implemented in *React* with *Typescript* and used plain *CSS* for designing. [HERE Maps](https://developer.here.com/) api is used for location related interactions.

### Webpack

Webpack compiles typescript and bundles all the modules and dependencies for both Server and client.

Server bundle goes to `dist/server.js` and client bundle goes to `public/client.js`.

### Docker

Applicaition is Dockerized and can be easily setup and run on any machine. 

## How to Run on Local Machine

The easiest way run the application is via `docker-compose`.

1. Download/Clone the project on local machine
2. Rename `.env_template` to `.env` 
3. Add HERE Maps REST API key in `.env` file. Check the [documentation](https://developer.here.com/documentation/maps/dev_guide/topics/credentials.html)
4. run `docker-compose up`
5. Access the application on `http://localhost:8080`
6. For test purpose you can access Database with mongo express `http://localhost:8082/db/local`