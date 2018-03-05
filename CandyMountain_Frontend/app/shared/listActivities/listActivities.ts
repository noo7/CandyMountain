import { Activity } from "../../shared/list/activity";

export class ListActivities {
    id: number;
    name: string;
    activities: Array<Activity>;

    constructor(options: any) {
        this.id = options.id;
        this.name = options.name;
        this.activities = options.activities;
    }
}