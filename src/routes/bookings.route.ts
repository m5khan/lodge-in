import express from 'express';
import { Service } from 'typedi';
import { BookingController } from '../controllers/bookingController';


/**
 * Route handler for /booking related calls
 */
@Service()
export class BookingRoute {
    
    constructor (private bookingController: BookingController) { }
    
    
    public get routes(): express.Router {

        const bookingRoutes:express.Router = express.Router();
        
        bookingRoutes.post('/', this.bookingController.validateBookingData, this.bookingController.addBooking);

        return bookingRoutes;
    }
    
}