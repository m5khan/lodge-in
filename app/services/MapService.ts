import { api } from './ApiClient';

/**
 * This class is handling all the side effects as said in react language
 * as in context with the Here maps api, Loading the map and map interactions
 * for example adding markers and handling events triggered on Here Maps
 */
export class MapService {
    
    private platform: any;
    private hereMap: any;
    private markerIcon: any; 
    private markerIconActive: any;
    private markerGroup: any;
    private setLocationData:(data:LocationData)=> void = () => {};
    
    constructor() {
        this.platform = new H.service.Platform({
            'apikey': '6zhmzcvXH8-jk6sCareHPWl7MNxawc00aiO1dwyWSH8'
        });
        this.markerIcon = new H.map.Icon('/images/markericon.svg');
        this.markerIconActive = new H.map.Icon('/images/markericon_active.svg');
    }
    
    /**
     * Initialize the HERE Maps and attach relevant event listeners
     * 
     * @param divElement Elemenet where the Map will be appended by Here Api
     * @param setLocData React Dispatch variable to update react state
     */
    public async initialize(divElement: HTMLDivElement | null, setLocData: (data:LocationData)=>void): Promise<void> {
        this.setLocationData = setLocData;
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
        
        /**
         * Attach all the initial event listers on the map here
         * 
         * @param mapInstance 
         */
        private addListeners(mapInstance: any) {
            
            mapInstance.addEventListener('mapviewchangeend', async () => {
                const items: LocationData[] = await this.fetchLocations(mapInstance);
                this.addMarkers(items);
            });
        }

        /**
         * Fetch locations to update the markers onv the map
         * 
         * @param mapInstance Here Map instance
         */
        private async fetchLocations(mapInstance: any): Promise<LocationData[]> {
            const {lat, lng}: Position = mapInstance.getCenter() as Position;
            const locData = await api.getProperties(lat, lng);
            const items: LocationData[] = locData.items;
            // take up to 15 items
            // const limitItems = items.splice(0,15);
            const limitItems = items;
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
                    this.markerGroup.forEach((m: any) => m.setIcon(this.markerIcon));
                    marker.setIcon(this.markerIconActive);
                    // set the data from the map to react state
                    this.setLocationData(marker.getData());
                });
                this.markerGroup.addObject(marker);
            });
        }

        private removeMarkerGroup(markerGroup: any) {
            markerGroup.getObjects().forEach((i: any) => i.dispose());
            this.hereMap.removeObject(markerGroup);
        }
        
        /**
         * Destructor
         */
        public terminate () {
            this.platform = null;
            this.removeMarkerGroup(this.markerGroup);
            this.hereMap = null;
            this.markerGroup = null;
            this.markerIcon = null;
            this.markerIconActive = null;
        }
        
    }
    
    
    export interface LocationData {
        title: string;
        id: string;
        resultType: string;
        address: Address;
        position: Position;
        access: Position[];
        distance: number;
        categories: {[id: string]: string};
        foodTypes: {[id: string]: string};
        contacts?: Contact[];
        openingHours: OpeningHour[];

    }
    
    interface Position {
        lat: number;
        lng: number;
    }

    interface Address {
        label: string;
        countryCode: string;
        countryName: string;
        state: string;
        county: string;
        city: string;
        district: string;
        street: string;
        postalCode: string;
        houseNumber: string;
    }

    interface Contact {
        phone?: {label:string, value:string}[];
        mobile?: {label:string, value:string}[];
        tollFree?: {label:string, value:string}[];
        fax?: {label:string, value:string}[];
        www?: {label:string, value:string}[];
        email?: {label:string, value:string}[];
    }

    interface OpeningHour {
        isOpen: boolean;
        structured: any;
        text: string[];
    }

    export interface BookLocationData extends LocationData {
        day: string;
        time?: Date;
    }