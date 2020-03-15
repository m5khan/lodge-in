import { Service } from 'typedi';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'http';
import { Provider } from '.';
import { PropertyRoute } from '../routes/properties.route';
import { BookingRoute } from '../routes/bookings.route';

/**
 * Configure and starts the node http server
 */

@Service()
export class WebProvider implements Provider {

    private httpServer?: Server;

    constructor(
        private bookingRoute: BookingRoute,
        private propertyRoute: PropertyRoute
        ) {
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

        // Configure Routing
        app.use('/properties', this.propertyRoute.route);
        app.use('/bookings', this.bookingRoute.routes);

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