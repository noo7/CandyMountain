import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Page } from "ui/page"
import { GestureEventData } from "ui/gestures";
import { SearchBar } from "ui/search-bar";
import {isAndroid} from "platform";
import { forEach } from "@angular/router/src/utils/collection";

import { UserService } from "../../shared/user/user.service";
import { User } from "../../shared/user/user";
import { ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ListActivities } from "../../shared/listActivities/listActivities";
import { Activity } from "../../shared/list/activity";
import { ActivityListService } from "../../shared/list/activity-list.service";


@Component({
    selector: "ActivitiesList",
    moduleId: module.id,
    templateUrl: "./activities-list.html",
    styleUrls: ["./activities-list.component.css"]
})
export class ActivitiesList implements OnInit, AfterViewInit {
    private _isLoading: boolean = true;
    private user: User = new User;
    private _listActivities: Array<ListActivities> = [];

    constructor(
        private router: Router,
        private _activityListService: ActivityListService,
        private userService: UserService,
        private _routerExtensions: RouterExtensions,
        private page: Page,
        private _changeDetectionRef: ChangeDetectorRef
    ) { }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }


    ngOnInit(): void {
        this.page.actionBarHidden = false;
        this._isLoading = true;
        this.user = this.userService.getLoggedInUser();
        // TODO user id is not supposed to be set manually
        this._activityListService.load('user/' + this.user.id + '/recommendation')
        .subscribe(loadedActivities => {
            loadedActivities.forEach((listActivityObject) => {
               this._listActivities.unshift(listActivityObject);
            });
       });

        this._activityListService.load('user/' + this.user.id + '/activities')
         .subscribe(loadedActivities => {
             loadedActivities.forEach((listActivityObject) => {
                this._listActivities.unshift(listActivityObject);
             });
             this._isLoading = false;
        });
        console.log("Logged in user from User Service");
        console.dir(this._activityListService.getLoggedInUser());  
    }

    //to solve the issue that the search bar is focused
    public onSearchBarLoaded(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.dismissSoftInput();

        if (isAndroid) {
            searchBar.android.clearFocus();
        }

        searchBar.text = "";
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
       this.drawer.closeDrawer();
    }

    get activities(): Array<ListActivities> {
        return this._listActivities;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onActivityItemTap(args: Activity): void {
        const tappedActivity = args;
        this.router.navigate(["/activity-detail", tappedActivity.id]);
    }

    onSearchClear(args): void{
        let searchBar = <SearchBar>args.object; 
        searchBar.text = "";
    }

    onSearchSubmit(args): void{
        let searchBar = <SearchBar>args.object;
        this.router.navigate(["activity-list-search", searchBar.text]);
        searchBar.text = "";
        // this._listActivities = []
        // this.page.actionBarHidden = false;
        // this._isLoading = true;
        // this._activityListService.load('activities/' + searchBar.text)
        //  .subscribe(loadedActivities => {
        //      loadedActivities.forEach((listActivityObject) => {
        //         this._listActivities.unshift(listActivityObject);
        //      });
        //      this._isLoading = false;
        // });
    }
}