import { Service } from 'typedi';
import { Provider } from '.';
import { MongoService } from '../services/mongoService';

/**
 * Initialize all the services on persistance layer
 */
@Service()
export class PersistenceProvider implements Provider {

    constructor(private mongoService: MongoService) {}
    
    public async bootstrap(): Promise<void> {
        await this.mongoService.bootstrap();
    }

    public async shutdown(): Promise<void> {
        await this.mongoService.shutdown();
    }
    
}