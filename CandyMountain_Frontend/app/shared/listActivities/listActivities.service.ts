import { Injectable, NgZone } from "@angular/core";
import { Http , Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Config } from "../../shared/config";
import { Activity } from "../../shared/list/activity";
import { ListActivities } from "../../shared/listActivities/listActivities";
import { actionBarHiddenProperty } from "tns-core-modules/ui/page/page";


@Injectable()
export class ListActivitiesService {
    private _activities: Array<Object> = [];
    private _listOfActivities: Array<ListActivities> = []

    constructor(private _ngZone: NgZone, private http: Http) {}

    load(route) {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
    
        return this.http.get(Config.localServer + route, {
          headers: headers
        })
        .map(res => res.json())
        .map(data => {
        
        let listsOfActivities = []
        data.forEach((list) => {
            let activities = [];
            list['activities'].forEach((activity) => {
                activities.push({id: activity.activity_id,
                    name: activity.name,
                    imageUrl: Config.localServer + "photos/" + activity.activity_id + ".jpg"});
            });
            // activities.forEach((activity) => {
            //     this._activities.unshift(activity)
            // });            
            listsOfActivities.push(new ListActivities({id: list.list_id,
                                name: list.list_title,
                                activities: activities}))
        });
        // console.dir(this._activities);

        return listsOfActivities;

        })
        .catch(this.handleErrors);
    }

    getCarById(id: number): Activity {
        if (!id) {
            return;
        }
    }

    loadList(): Array<Object> {
        return this._activities;
    }


    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
