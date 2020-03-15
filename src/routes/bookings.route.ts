import express from 'express';
import { Service } from 'typedi';
import { MongoService } from '../services/mongoService';

@Service()
export class BookingRoute {
    
    constructor (private mongoService: MongoService) { }
    
    
    public get routes(): express.Router {

        const bookingRoutes:express.Router = express.Router();
        
        bookingRoutes.post('/', async (req: express.Request, res: express.Response) => {
            try{
                const insertedId = await this.mongoService.addBooking(req.body);
                res.json(insertedId);
            } catch (e) {
                res.json(e);
            }
        });

        return bookingRoutes;
    }
    
}