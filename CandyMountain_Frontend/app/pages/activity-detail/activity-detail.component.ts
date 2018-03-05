import { Component, OnInit, AfterViewInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { registerElement } from 'nativescript-angular/element-registry';
import { Observable } from "rxjs/Observable";

import { Activity } from "../../shared/list/activity";
import { ActivityListService } from "../../shared/list/activity-list.service";
import { ActivityService } from "../../shared/list/activity.service";

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);


@Component({
    selector: "ActivityDetail",
    providers: [ActivityService], 
    moduleId: module.id,
    templateUrl: "./activity-detail.component.html",
    styleUrls: ["./activity-detail.component.css"]
})
export class ActivityDetail implements OnInit, AfterViewInit  {
    private _activity: Activity = new Activity({
        id: "",
        name: "",
        description: "",
        added_by: "",
        latitude: "",
        longitude: "",
        likes: 0,
        tags: "",
        imageUrl: ""});
    private _isLoading: boolean = true;

    latitude =  48.158614;
    longitude = 11.574261;
    zoom = 14;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: String;

    constructor(
        //private _activityService: ActivityListService,
        private _activityService: ActivityService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { 
    }

    ngOnInit(): void {
        console.log("NGONIT RUN THATölsfjdlkshjfkjdshgjkfdshjkfhsdkfhkdshfkjdshfkldshgjhsdhfksdj");
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                this._activityService.load('activity/' + params.id)
                .subscribe(loadedActivity => {
                    this._activity = loadedActivity;
                    this._isLoading = false;

                    this.latitude = this._activity.latitude;
                    this.longitude = this._activity.longitude;
                    console.log("##################ngONNIT");
                    this.addMarkerToMap(this.mapView);
                });

            });
    }

    ngAfterViewInit(): void {
        console.log("##################ngAfterViewINIT");
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get activity(): Activity {
        return this._activity;
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    like(): void {
        console.log("Heart Icon has been tapped");
    }

    onAddButtonTap(): void {
        console.log("Add Button has been tapped");
        // this._routerExtensions.navigate(["/cars/car-detail-edit", this._activity.id],
        //     {
        //         animated: true,
        //         transition: {
        //             name: "slideTop",
        //             duration: 200,
        //             curve: "ease"
        //         }
        //     });
    }

    public onIndexChanged(args) {
        let tabView = <TabView>args.object;
        console.log("Selected index changed! New inxed: " + tabView.selectedIndex);
    }

    onMapReady(event) {
        console.log('##########Map Ready');

        this.mapView = event.object;
        this.addMarkerToMap(this.mapView);


    }

    addMarkerToMap(map: MapView){
        console.log("Setting a marker...");

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
        marker.title = this._activity.name;
        marker.snippet = this._activity.tags[0];
        marker.userData = {index: 1};
        map.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }
}
