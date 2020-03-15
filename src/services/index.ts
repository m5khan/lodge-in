export interface Location {
    discover: (latitude: string, longitude: string, query: string)=>void;
    getHotels: ()=>void;
}