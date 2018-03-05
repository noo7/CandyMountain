import { Injectable, NgZone } from "@angular/core";
import { Http , Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Config } from "../../shared/config";
import { Activity } from "../../shared/list/activity";
import { ListActivities } from "../../shared/listActivities/listActivities";
import { actionBarHiddenProperty } from "tns-core-modules/ui/page/page";


@Injectable()
export class ActivityService {
    private _activity: Activity;
    constructor(private _ngZone: NgZone, private http: Http) {
    }

    load(route) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.get(Config.localServer + route) 
        .map(res => {
            return res.json();
        })
        .map(data => {

            this._activity = new Activity({
                id: data.activity_id,
                name: data.name,
                description: data.description,
                added_by: data.added_by,
                latitude: data.latitude,
                longitude: data.longitude,
                likes: data.likes,
                tags: data.tags,
                imageUrl: Config.localServer + "photos/" + data.activity_id + ".jpg"});

            return this._activity;

        })
        .catch(this.handleErrors);
    }
    private handleErrors(error: Response): Observable<any> {
        console.dir(error);
        return Observable.throw(error);
    }

    getActivityById(id: number): Activity {
        if (!id) {
            return;
        }
        this.load('activity/' + id);

        return this._activity;
        // this.load('activity/' + id)
        //  .subscribe(activity => {
        //      this._activity = activity;
        // });
        // console.log(this._activity)
        // return this._activity;
    } 
}
