import express from 'express';

export const propertyRoutes:express.Router = express.Router();

propertyRoutes.get('/', (req: express.Request, res: express.Response) => {
    res.json('hello world');
});