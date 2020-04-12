import express from 'express';
import { Service } from 'typedi';
import { MongoService } from '../services/mongoService';
import assert from 'assert';

/**
 * Controllers for /booking routes
 * 
 * TODO: User typedi controller
 * https://github.com/typestack/routing-controllers
 */
@Service()
export class BookingController {
    
    constructor (private mongoService: MongoService) {
        this.addBooking = this.addBooking.bind(this);
     }

    /**
     * Handle booking request of the property and to add it to the database
     * 
     * @param req 
     * @param res 
     */ 
    public async addBooking (req: express.Request, res: express.Response) {
        try{
            // todo: validate the request body
            const insertedId = await this.mongoService.addBooking(req.body);
            res.json(insertedId);
        } catch (e) {
            res.json(e);
        }
    }


    /**
     * Middleware for validating data
     * TODO: Do proper validation and sanitization
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public validateBookingData(req: express.Request, res: express.Response, next: express.NextFunction) {
        let d: LocationData = {} as LocationData;
        try{
            assert.ok(req.body.id);
            assert.ok(req.body.guests);
            d.id = req.body.id;
            d.title = req.body.title;
            d.guests = req.body.guests;
            d.time = new Date();
            d.position = {lat: req.body.position.lat, lng: req.body.position.lng};
            d.distance = req.body.distance;
            d.address = {
                label: req.body.address.label,
                countryCode: req.body.address.countryCode,
                countryName: req.body.address.countryName,
                state: req.body.address.state,
                county: req.body.address.country,
                city: req.body.address.city,
                district: req.body.address.district,
                street: req.body.address.street,
                postalCode: req.body.address.postalCode,
                houseNumber: req.body.address.houseNumber
            }
            req.body = d;
            next();
        } catch (error) {
            res.status(400);
            res.json({error, message: 'Invalid Data'});
        }
    }
}


export interface LocationData {
    title: string;
    id: string;
    address: Address;
    distance: number;
    position: Position;
    guests: number;
    time: Date;
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