import { api } from './ApiClient';
 
export class MapService {

    private static instance: MapService;
    private platform: any;
    private hereMap: any;

    constructor() {
        this.platform = new H.service.Platform({
            'apikey': '6zhmzcvXH8-jk6sCareHPWl7MNxawc00aiO1dwyWSH8'
        });
    }

    static getInstance(): MapService {
        if(!MapService.instance) {
            MapService.instance = new MapService();
        }
        return MapService.instance;
    }

    public initialize(divElement: HTMLDivElement | null) {
        // Instantiate (and display) a map object:
        this.hereMap = this.initializeMap(divElement);
        // Enable the event system on the map instance:
        const mapEvents = new H.mapevents.MapEvents(this.hereMap);
        this.addListeners(this.hereMap);
        // Instantiate the default behavior, providing the mapEvents object:
        new H.mapevents.Behavior(mapEvents);
    }

    private initializeMap (divElement: HTMLDivElement|null): any {
        const defaultLayers = this.platform.createDefaultLayers();
        const hereMap =  new H.Map(
            divElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: { lat: 52.5, lng: 13.4 }
            });
        return hereMap;
    }

    private addListeners(mapInstance: any) {
        mapInstance.addEventListener('tap', (evt: any) => {
            // Log 'tap' and 'mouse' events:
            console.log(evt.type);
        });

        mapInstance.addEventListener('dragend', async () => {
            const {lat, lng}: Position = mapInstance.getCenter() as Position;
            const locData = await api.getProperties(lat, lng);
            const items: LocationData[] = locData.items;
            console.log(items);
        });
    }

    public terminate () {
        this.platform = null;
        this.hereMap = null;
    }

}


export interface LocationData {
    title: string;
    id: string;
    resultType: string;
    address: {[key: string]: string};
    access: any;
    distance: number;
    categories: any;
    position: Position;
}

interface Position {
    lat: number;
    lng: number;
}