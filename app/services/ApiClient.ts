import { LocationData } from './MapService';

interface Response {
    items: LocationData[]
}

export default class ApiClient {
    
    public getProperties (latitude: number, longitude: number): Promise<Response> {
        return fetch(`/properties?at=${latitude},${longitude}`).then((res) => {
            return res.json();
        }).catch((e:Error) => {
            console.error(e);
        })
    }
}

export const api = new ApiClient();