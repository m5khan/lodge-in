import { api } from './ApiClient';


/**
 * This class is handling all the side effects as said in react language
 */
export class MapService {
    
    private static instance: MapService;
    private platform: any;
    private hereMap: any;
    private markerIcon: any; 
    private markerGroup: any;
    
    constructor() {
        this.platform = new H.service.Platform({
            'apikey': '6zhmzcvXH8-jk6sCareHPWl7MNxawc00aiO1dwyWSH8'
        });
        this.markerIcon = new H.map.Icon('/images/markericon.svg');
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
            
            mapInstance.addEventListener('dragend', async () => {
                const {lat, lng}: Position = mapInstance.getCenter() as Position;
                const locData = await api.getProperties(lat, lng);
                const items: LocationData[] = locData.items;
                // take up to 10 items
                const limitItems = items.splice(0,10);
                this.addMarkers(limitItems);
                
            });
        }
        
        private addMarkers (items: LocationData[]) {
            if(this.markerGroup) {
                this.removeMarkerGroup(this.markerIcon);
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
            this.markerIcon = null;
            this.markerIcon = null;
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