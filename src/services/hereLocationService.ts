import { Service } from 'typedi';
import { Location } from '.';
import { RemoteService} from './remoteService';

/**
 * Categories for locations in Here Maps api
 * For details please refer to:
 * https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics-places/places-category-system-full.html
 */
const hotelLodging = [
    '500-5100-0053',    // Hotel
    '500-5100-0054',    // Motel
    '500-5100-0055',    // Hostel
    '500-5100-0056',    // Campground
    '500-5100-0057',    // Guesthouse
    '500-5100-0058'     // Bed and Breakfast
];

@Service()
export class HereLocationService implements Location {

    constructor(private remoteService: RemoteService) {}

    discover() {
        
    }
    
    /**
     * Get hotels in munich
     */
    async getHotels(): Promise<any> {
        const url = this.getDiscoverApi(48.135124, 11.581981, 'hotel');
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
        const uri = this.getDiscoverApi(latitude, longitude, 'hotel');
        return this.remoteService.get(uri);
    }

    async getLodgeServices(latitude: number, longitude: number, limit?: number): Promise<any> {
        const uri = this.getBrowseApi(latitude, longitude, limit);
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
    private getDiscoverApi(lat: number, lon: number, q: string): string {
        const discoverUrl = new URL('https://discover.search.hereapi.com');
        discoverUrl.pathname = '/v1/discover';
        discoverUrl.searchParams.set('at', `${lat},${lon}`);
        discoverUrl.searchParams.set('q', q);
        discoverUrl.searchParams.set('apiKey', process.env.HERE_KEY as string);
        return discoverUrl.href;
    }

    /**
     * Browse the locations based on categories.
     * categories provided are of hotels and lodging services
     * 
     * @param lat latitude
     * @param lng longitude
     * @param limit search results default limit 20
     */
    private getBrowseApi(lat: number, lng: number, limit: number = 20): string {
        const discoverUrl = new URL('https://browse.search.hereapi.com');
        discoverUrl.pathname = '/v1/browse';
        discoverUrl.searchParams.set('at', `${lat},${lng}`);
        discoverUrl.searchParams.set('limit', limit.toString());
        discoverUrl.searchParams.set('categories', hotelLodging.toString());
        discoverUrl.searchParams.set('apiKey', process.env.HERE_KEY as string);
        return discoverUrl.href;
    }
}