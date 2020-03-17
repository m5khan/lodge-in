export class MapService {

    private static instance: MapService;
    private platform: any;
    private containerDom: HTMLDivElement | null = null;

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

    public initializeMap(divElement: HTMLDivElement | null) {
        this.containerDom = divElement;
        const defaultLayers = this.platform.createDefaultLayers();
        // Instantiate (and display) a map object:
        new H.Map(
            divElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: { lat: 52.5, lng: 13.4 }
            });
    }

    public terminate () {
        this.containerDom = null;
        this.platform = null;
    }

}