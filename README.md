# lodge-in

Full-stack showcase application to search for near by properties and book them using HERE location API. Based on Node.js, React, typescript and MongoDB.

## Demo
Check out live **[demo here](https://lodge-in.herokuapp.com/)** 

Demo is deployed on Heroku server. You can book properties and also check already booked apointments for the selected property by clicking on the burger icon.

## Application Structure

Application has two folders front-end and backend stack.

- `src` folder
  - `src` folder contains the back-end implementation.

- `app` folder
  - `app` folder contains the front-end code.


### Webpack

Webpack compiles typescript and bundles all the modules and dependencies for both Server and client.

Server bundle goes to `dist/server.js` and client bundle goes to `public/client.js`.

### Docker

Applicaition is Dockerized and can be easily setup and run on any machine. 

## How to Run on Local Machine

The easiest way to run the application is via `docker-compose`.

1. Download/Clone the project on local machine
2. Rename `.env_template` to `.env` 
3. Add HERE Maps REST API key in `.env` file. Check the [documentation](https://developer.here.com/documentation/maps/dev_guide/topics/credentials.html)
4. run `docker-compose up`
5. Access the application on `http://localhost:8080`
6. For test purpose you can access Database with mongo express `http://localhost:8082/db/lodge-in`

Note: I left my HERE Maps api key in the file for demo purpose. I will deactivate the keys in the future.

## Technical Spec

### Back-end

Tech-stack: `Node.js`, `Typescript`, `Express.js`, `MongoDB`, `TypeDI`, `REST`

#### endpoint implementations:

```
/properties?at=LAT,LONG	//Returns the property around Lat/Lon
```
```
/bookings	//Creates a booking for a property.
```
```
/properties/PROPERTY_ID/bookings	//Returns the bookings for a property
```

`/bookings` payload schema:
```typescript
    interface BookLocationData {
        day: string;
        time?: Date;
        title: string;
        id: string;
        address: Address;
        distance: number;
        position: Position;
    }
    
    interface Position {
        lat: number;
        lng: number;
    }

    interface Address {
        label: string;
        countryCode: string;
        countryName: string;
        state: string;
        county: string;
        city: string;
        district: string;
        street: string;
        postalCode: string;
        houseNumber: string;
    }
```

### Front-end

Tech-stack: `React`, `Typescript`, `html5`, `CSS`, `Material-UI`, `HERE Maps`

Framework used frontend include React with Typescript.

### Dev-OP

Tech-stack: `Docker`, `Webpack`, `Heroku`, `mLab`

Application can be easily run using `docker-compose up`. Webpack bundles the two separate modules i.e. client and server. server bundle resides in `dist/server.js` where client bundle resides in `public/cilent.js`.

Application is also deployed on Heroku server which uses mLab mongoDB service.