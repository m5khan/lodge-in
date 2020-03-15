import { Service } from 'typedi';
import { Provider } from '.';

@Service()
export class PersistenceProvider implements Provider {
    
    public async bootstrap(): Promise<void> {

    }

    public async shutdown(): Promise<void> {

    }
    
}