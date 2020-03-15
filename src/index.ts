import "reflect-metadata";
import { Container, Service } from 'typedi';
import { Provider } from './providers';
import { WebProvider } from './providers/web';
import { PersistenceProvider } from './providers/persistence';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Application Bootstrap
 * Get the service providers and run all the services
 * i.e. run persistance services and start the web server
 * 
 * The application uses typedi for dependency injection
 * 
 * todo: implement controllers and ORM from typestack
 * https://github.com/typestack
 */
@Service()
class Application implements Provider {
    private services: Provider[];

    constructor(
        private webProvider: WebProvider,
        private persistenceProvider: PersistenceProvider
    ) {
        this.services = [
            this.webProvider,
            this.persistenceProvider
        ]
    }

    async bootstrap(): Promise<void> {
        for (let service of this.services) {
            await service.bootstrap();
        }
    }

    async shutdown(): Promise<void> {
        for (let service of this.services) {
            await service.shutdown();
        }
    }

}

(async () => {
    const app = Container.get<Provider>(Application);
    console.log('Bootstrapping Application...');
    await app.bootstrap();
    console.log('Bootstrap Successful. Application is now running.')
})();