import { api } from './ApiClient';


/**
 * This class is handling all the side effects as said in react language
 */
export class MapService {
    
    private static instance: MapService;
    private platform: any;
    private hereMap: any;
    private markerIcon: any; 
    private markerIconActive: any;
    private markerGroup: any;
    
    constructor() {
        this.platform = new H.service.Platform({
            'apikey': '6zhmzcvXH8-jk6sCareHPWl7MNxawc00aiO1dwyWSH8'
        });
        this.markerIcon = new H.map.Icon('/images/markericon.svg');
        this.markerIconActive = new H.map.Icon('/images/markericon_active.svg');
    }
    
    static getInstance(): MapService {
        if(!MapService.instance) {
            MapService.instance = new MapService();
        }
        return MapService.instance;
    }
    
    public async initialize(divElement: HTMLDivElement | null): Promise<void> {
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
            
            mapInstance.addEventListener('mapviewchangeend', async () => {
                const items: LocationData[] = await this.fetchLocations(mapInstance);
                this.addMarkers(items);
            });
        }

        private async fetchLocations(mapInstance: any): Promise<LocationData[]> {
            const {lat, lng}: Position = mapInstance.getCenter() as Position;
            const locData = await api.getProperties(lat, lng);
            const items: LocationData[] = locData.items;
            // take up to 10 items
            const limitItems = items.splice(0,10);
            return limitItems;
        }
        
        private addMarkers (items: LocationData[]) {
            if(this.markerGroup) {
                this.removeMarkerGroup(this.markerGroup);
            }
            this.markerGroup = new H.map.Group();
            this.hereMap.addObject(this.markerGroup);
            // adding markers
            items.forEach((item:LocationData) => {
                const markerOptions = {
                    ...item.position,
                }
                const marker = new H.map.Marker(markerOptions, { icon: this.markerIcon });
                marker.setData(item);
                marker.addEventListener('tap', () => {
                    console.log(marker.getData());
                    this.markerGroup.forEach((m: any) => m.setIcon(this.markerIcon));
                    marker.setIcon(this.markerIconActive);
                    // set the data from the map to react state
                });
                this.markerGroup.addObject(marker);
            });
        }

        private removeMarkerGroup(markerGroup: any) {
            markerGroup.getObjects().forEach((i: any) => i.dispose());
            this.hereMap.removeObject(markerGroup);
        }
        
        public terminate () {
            this.platform = null;
            this.hereMap = null;
            this.removeMarkerGroup(this.markerGroup);
            this.markerGroup = null;
            this.markerIcon = null;
            this.markerIconActive = null;
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