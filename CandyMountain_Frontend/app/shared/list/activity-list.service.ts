import { Injectable, NgZone } from "@angular/core";
import { Http , Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Config } from "../../shared/config";
import { Activity } from "./activity";
import { ListActivities } from "../../shared/listActivities/listActivities";
import { actionBarHiddenProperty } from "tns-core-modules/ui/page/page";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";


/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
@Injectable()
export class ActivityListService {

    private _activities: Array<Activity> = [];
    private _listOfActivities: Array<ListActivities> = []

    constructor(
        private _ngZone: NgZone, 
        private http: Http,
        private userService: UserService
    ) { }

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
                activities.push(new Activity({id: activity.activity_id,
                    name: activity.name,
                    description: activity.description,
                    added_by: activity.added_by,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                    likes: activity.likes,
                    imageUrl: Config.localServer + "photos/" + activity.activity_id + ".jpg"}));
            });
            activities.forEach((activity) => {
                this._activities.unshift(activity)
            });            
            listsOfActivities.push(new ListActivities({id: list.list_id,
                                name: list.list_title,
                                activities: activities}))
        });
        // console.dir(this._activities);

        return listsOfActivities;

        })
        .catch(this.handleErrors);
    }

    getActivityById(id: number): Activity {
        if (!id) {
            return;
        }
        // console.log("Searching for id " );
        // console.log(id);
        return this._activities.filter((activity) => {
            return activity.id == id;
        })[0];
    }

    loadList(): Array<Activity> {
        return this._activities;
    }

    getLoggedInUser() : User{
        return this.userService.getLoggedInUser();
    }


    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
