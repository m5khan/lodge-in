import express from 'express';
import { Service } from 'typedi';
import { PropertyController } from '../controllers/propertyController';

@Service()
export class PropertyRoute {
    
    constructor (private propertyController: PropertyController) { }
    
    public get route () {
        const propertyRoutes:express.Router = express.Router();
        
        propertyRoutes.get('/', this.propertyController.getProperties);

        propertyRoutes.get('/:id/bookings', this.propertyController.getPropertyBooking);

        return propertyRoutes
    }
}