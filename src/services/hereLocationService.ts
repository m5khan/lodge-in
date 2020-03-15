import { Service } from 'typedi';
import { Location } from '.';
import { RemoteService} from './remoteService';

@Service()
export class HereLocationService implements Location {

    constructor(private remoteService: RemoteService) {}

    discover(latitude: string, longitude:string, query:string) {
        
    }
    
    async getHotels(): Promise<any> {
        const url = this.getApi('48.135124', '11.581981', 'hotel');
        return this.remoteService.get(url);
    }

    private getApi(lat: string, lon: string, q: string): string {
        //const hereSearchApi = 'https://discover.search.hereapi.com/v1/discover?at=48.135124,11.581981&q=hotels&apiKey=dGPFyjnFTBNoCzTcpteWs8EloxnXq_vop4EdWr3CifQ'
        const discoverUrl = new URL('https://discover.search.hereapi.com');
        discoverUrl.pathname = '/v1/discover';
        discoverUrl.searchParams.set('at', `${lat},${lon}`);
        discoverUrl.searchParams.set('q', q);
        discoverUrl.searchParams.set('apiKey', process.env.HERE_KEY as string);
        return discoverUrl.href;

    }
}