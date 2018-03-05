//used this guy's plugin 
//https://github.com/dapriett/nativescript-google-maps-sdk/tree/master/ng-demo
import {Component, ViewChild} from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';


// Important - must register MapView plugin in order to use in Angular templates
//registerElement('MapView', () => MapView);

@Component({
    moduleId: module.id,
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['map-common.css'],
})
export class MapComponent {

    latitude =  48.158614;
    longitude = 11.574261;
    zoom = 14;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: String;

    constructor() {
    }

    //Map events
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object;

        console.log("Setting a marker...");

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(48.161435, 11.574664);
        marker.title = "Arts 'n' Boards";
        marker.snippet = "Arts Cafe";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);


        var marker = new Marker();
        marker.position = Position.positionFromLatLng(48.153276, 11.577737);
        marker.title = "APRI Kino";
        marker.snippet = "Cinema";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);

        
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(48.153826, 11.575856);
        marker.title = "Freebird Bar";
        marker.snippet = "Good Cocktails";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
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