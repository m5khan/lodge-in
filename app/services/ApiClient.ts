import { LocationData, BookLocationData } from './MapService';

interface Response {
    items: LocationData[];
}

export default class ApiClient {
    
    
    public getProperties (latitude: number, longitude: number): Promise<Response> {
        return fetch(`/properties?at=${latitude},${longitude}`).then((res) => {
            return res.json();
        }).catch((e:Error) => {
            console.error(e);
        })
    }

    public bookProperty (data: BookLocationData): Promise<string> {
        return fetch('/bookings', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).catch((e: Error) => {
            console.error(e);
        })
    }

    public async getPropertyBookings(propertyId: string): Promise<void> {
        const res = await fetch(`/properties/${propertyId}/bookings`);
        const data = await res.json();
        return data;
    }
}

export const api = new ApiClient();