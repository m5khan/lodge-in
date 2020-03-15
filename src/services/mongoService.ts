import { Service } from 'typedi';
import { MongoClient, Collection, InsertWriteOpResult, Db, ObjectID } from "mongodb";
import { Provider } from '../providers';
import { DataPersistance } from '.';

@Service()
export class MongoService implements Provider, DataPersistance {

    private dbUrl: string;
    private dbName: string;
    private collectionName: string = "bookings";

    constructor() {
        this.dbUrl = process.env.MONGO_URI as string;
        this.dbName = process.env.DBNAME as string;
    }
    
    async bootstrap(): Promise<void> {
        console.log("bootstrapping mongo service");
        const mongoClient :MongoClient = await this.openConnection();
        console.log("MongoDB Server connection successful");
        const db:Db = mongoClient.db(this.dbName);
        mongoClient.close();  
    }


    async shutdown(): Promise<void> {

    }

    async openConnection(): Promise<MongoClient> {
        return await MongoClient.connect(this.dbUrl, { useUnifiedTopology: true });
    }
    
    async closeConnection (client: MongoClient) {
        client.close();
    }

    private async getCollection (): Promise<ICollection> {
        const client: MongoClient = await this.openConnection();
        const db: Db = client.db(this.dbName);
        const collection:Collection<any> = await new Promise((resolve, reject) => {
            db.collection(this.collectionName, (err, collection: Collection<any>) => {
                if(err) {
                    client.close();
                    reject(err);
                }
                resolve(collection);
            })
        });
        return {
            client,
            collection
        } as ICollection
    }

    public async addBooking(doc: any): Promise<string> {
        const { client, collection } = await this.getCollection();
        const insertedDoc = await collection.insertOne(doc);
        this.closeConnection(client);
        return insertedDoc.insertedId.toString();
    }


}


interface ICollection {
    collection: Collection<any>;
    client: MongoClient;
}