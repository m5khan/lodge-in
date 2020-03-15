import {Provider} from './providers';
import {Container, Service} from 'typedi';


@Service()
class Application implements Provider {

    constructor() {
        
    }

    async bootstrap(): Promise<void> {

    }

    async shutdown(): Promise<void> {

    }

}

(async () => {
    const app = Container.get<Provider>(Application);
    console.log('Bootstrapping Application');
    app.bootstrap();
})();