import express from 'express';
import { Container } from 'typedi';
import { HereLocationService } from '../services/hereLocationService';

export const propertyRoutes:express.Router = express.Router();

const hereLocationService:HereLocationService = Container.get(HereLocationService)

propertyRoutes.get('/', async (req: express.Request, res: express.Response) => {
    const location: string = req.query['at'];
    let data = null;
    if(location) {
        const [ lat, lon ] = location.split(',');
        data = await hereLocationService.getProperties(lat, lon);
    } else {
        data = 'please provide latutude and longitude. ?at=x,y';
    }
    res.json(data);
});