import { Service } from 'typedi';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'http';
import { Provider } from '.';
import { propertyRoutes } from '../routes/properties.route';

@Service()
export class WebProvider implements Provider {

    private httpServer?: Server;

    constructor() {
        if(!process.env.PORT) {
            console.log("Port not found");
            process.exit(1);
        }
    }

    public get port() {
        return parseInt(process.env.PORT as string, 10);
    }
    
    public async bootstrap(): Promise<void> {
        const app = express();
        // configure web server
        app.use(helmet());
        app.use(cors());
        app.use(express.json());
        app.use(express.static('public'));

        // Add router
        app.use('/properties', propertyRoutes);

        // Initialize http server
        return new Promise<void> ((resolve, reject) => {
            this.httpServer = app.listen(this.port, (err: Error) => {
                if (err) {
                    reject(err);
                }
                console.log('web server listening at port ' + this.port);
                resolve();
            });
        });
    }

    public async shutdown() {
        return new Promise<void>((resolve, reject) => {
            this.httpServer?.close();
        });
    }
    
}