import { Service } from 'typedi';
import { Provider } from '.';

@Service()
class PersistanceProvider implements Provider {
    
    async bootstrap(): Promise<void> {

    }

    async shutdown(): Promise<void> {

    }
    
}