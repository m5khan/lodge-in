import express from 'express';
import { Service } from 'typedi';
import { HereLocationService } from '../services/hereLocationService';
import { MongoService } from '../services/mongoService';

/**
 * Controller for /properties routes
 * 
 * TODO: User typedi controller
 * https://github.com/typestack/routing-controllers
 */
@Service()
export class PropertyController {
    
    constructor (
        private hereLocationService: HereLocationService,
        private mongoService: MongoService
        ) { 
            // Either bind `this` to the functions or use arrow functions
            this.getProperties = this.getProperties.bind(this);
            this.getPropertyBooking = this.getPropertyBooking.bind(this);
        }
        
        /**
         * Get properties from the "here location" api service
         *  at the provided latitude and longitude
         * 
         * @param req 
         * @param res 
         */
        public async getProperties(req: express.Request, res: express.Response) {
            const location: string = req.query['at'];
            let data = null;
            if(location) {
                const [ lat, lon ] = location.split(',');
                data = await this.hereLocationService.getProperties(lat, lon);
            } else {
                res.status(400);
                data = 'please provide latutude and longitude. ?at=x,y';
            }
            res.json(data);
        }
        
        /**
         * Get the booking information against the property id from the database
         * and return it to the client
         * 
         * @param req 
         * @param res 
         */
        public async getPropertyBooking(req: express.Request, res: express.Response) {
            const propId: string = req.params['id'];
            if (propId) {
                try {
                    const result: any[] = await this.mongoService.getBookings(propId);
                    res.json(result);
                } catch (e) {
                    console.log(e);
                    res.json(e);
                }
            } else {
                res.status(400);
                res.json('please provide property id');
            }
        }
        
    }