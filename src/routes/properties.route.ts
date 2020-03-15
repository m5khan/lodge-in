import express from 'express';
import { Container } from 'typedi';
import { HereLocationService } from '../services/hereLocationService';

export const propertyRoutes:express.Router = express.Router();

const hereLocationService:HereLocationService = Container.get(HereLocationService)

propertyRoutes.get('/', async (req: express.Request, res: express.Response) => {
    const data = await hereLocationService.getHotels();
     res.json(data);
});