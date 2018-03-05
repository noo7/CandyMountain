export class Activity {
    id: number;
    name: string;
    description: string;
    added_by: number;
    latitude: number;
    longitude: number;
    likes: number;
    tags: Array<string>; 
    imageUrl: string;
    // imageStoragePath: string;

    constructor(options: any) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.added_by = options.added_by;
        this.longitude = options.longitude;
        this.latitude = options.latitude;
        this.likes = options.likes;
        this.tags = options.tags;
        this.imageUrl = options.imageUrl;
        // this.imageStoragePath = options.imageStoragePath;
    }
}
