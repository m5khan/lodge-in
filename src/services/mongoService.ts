import { Service } from 'typedi';
import { Provider } from '../providers';

@Service()
export class MongoService implements Provider {
    
    async bootstrap(): Promise<void> {

    }


    async shutdown(): Promise<void> {

    }


}