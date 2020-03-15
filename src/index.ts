import "reflect-metadata";
import { Container, Service } from 'typedi';
import { Provider } from './providers';
import { WebProvider } from './providers/web';
import { PersistenceProvider } from './providers/persistence';
import dotenv from 'dotenv';
dotenv.config();


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
    console.log('Bootstrapping Application');
    app.bootstrap();
})();