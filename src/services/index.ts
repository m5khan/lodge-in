export interface Location {
    discover: (latitude: number, longitude: number, query: string)=>void;
    getHotels: ()=> Promise<any>;
    getProperties: (latutude: number, longitude: number) => Promise<any>;
}

export interface DataPersistance {
    openConnection(): Promise<any>;
    closeConnection: (connection:any) => Promise<any>;
}
