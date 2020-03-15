import { Service } from 'typedi';
import { MongoClient, Collection, Db } from "mongodb";
import { Provider } from '../providers';
import { DataPersistance } from '.';

@Service()
export class MongoService implements Provider, DataPersistance {

    private collectionName: string = "bookings";

    constructor() { }

    private get dbUrl(): string {
        return process.env.MONGO_URI as string;
    } 

    private get dbName(): string {
        return process.env.DBNAME as string;
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

    /**
     * Open mongodb connection and provide collection and client
     * this simplify the boilerplate code for each query to the database
     * 
     * usage: use the collection to query the database and close the 
     * connection from client after
     * 
     * @returns Promise with client and collection
     */
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

    /**
     * Add booking information to the mongodb collection
     * 
     * @param doc booking information in json
     */
    public async addBooking(doc: any): Promise<string> {
        const { client, collection } = await this.getCollection();
        const insertedDoc = await collection.insertOne(doc);
        this.closeConnection(client);
        return insertedDoc.insertedId.toString();
    }


    /**
     * Query mongodb collection and returns the booking information
     * against provided property id
     * 
     * @param propId here map location id
     */
    public async getBookings(propId: string): Promise<any[]> {
        const { client, collection } = await this.getCollection();
        const result = await collection.find({
            id : propId
        });
        const resultArr = await result.toArray();
        this.closeConnection(client);
        return resultArr;
    }
}


interface ICollection {
    collection: Collection<any>;
    client: MongoClient;
}