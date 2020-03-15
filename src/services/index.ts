export interface Location {
    discover: (latitude: string, longitude: string, query: string)=>void;
    getHotels: ()=> Promise<any>;
    getProperties: (latutude: string, longitude: string) => Promise<any>;
}

export interface DataPersistance {
    openConnection(): Promise<any>;
    closeConnection: (connection:any) => Promise<any>;
}
