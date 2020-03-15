import express from 'express';
import { Service } from 'typedi';
import { MongoService } from '../services/mongoService';

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
    
}