import { Service } from 'typedi';
import { Location } from '.';
import { RemoteService} from './remoteService';

@Service()
export class HereLocationService implements Location {

    constructor(private remoteService: RemoteService) {}

    discover() {
        
    }
    
    /**
     * Get hotels in munich
     */
    async getHotels(): Promise<any> {
        const url = this.getApi(48.135124, 11.581981, 'hotel');
        return this.remoteService.get(url);
    }

    /**
     * get the locations with name property in their name
     * from here location search api
     * 
     * @param latitude latitude 
     * @param longitude longitude
     */
    async getProperties(latitude: number, longitude: number): Promise<any> {
        const uri = this.getApi(latitude, longitude, 'property');
        return this.remoteService.get(uri);
    }

    /**
     * create the here location search API uri
     * 
     * @param lat latitude
     * @param lon longitude
     * @param q search query
     * 
     * @returns uri
     */
    private getApi(lat: number, lon: number, q: string): string {
        const discoverUrl = new URL('https://discover.search.hereapi.com');
        discoverUrl.pathname = '/v1/discover';
        discoverUrl.searchParams.set('at', `${lat},${lon}`);
        discoverUrl.searchParams.set('q', q);
        discoverUrl.searchParams.set('apiKey', process.env.HERE_KEY as string);
        return discoverUrl.href;

    }
}