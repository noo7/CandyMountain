import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObservableArray } from "data/observable-array";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { Page } from "ui/page"
import { GestureEventData } from "ui/gestures";
import { SearchBar } from "ui/search-bar";
import { forEach } from "@angular/router/src/utils/collection";

import { ListActivities } from "../../shared/listActivities/listActivities";
import { Activity } from "../../shared/list/activity";
import { ActivityListService } from "../../shared/list/activity-list.service";
import { ActivatedRoute } from "@angular/router/src/router_state";

@Component({
    selector: "ActivitiesList",
    moduleId: module.id,
    templateUrl: "./activity-list-search.html",
    styleUrls: ["../../pages/activity-list/activities-list.component.css"]
})
export class ActivitiesListSearch implements OnInit {
    private _isLoading: boolean = true;
    private _listActivities: Array<ListActivities> = [];

    constructor(
        private router: Router,
        private _activityListService: ActivityListService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private page: Page
    ) { }

    ngOnInit(): void {
        console.log("Here");
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                this._activityListService.load('activities/' + params.search_word)
                 .subscribe(loadedActivities => {
                     loadedActivities.forEach((listActivityObject) => {
                        this._listActivities.unshift(listActivityObject);
                     });
                });
            });
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
        this._listActivities = [];
    }

    // onSearchClear(args): void{
    //     let searchBar = <SearchBar>args.object; 
    //     searchBar.text = "";
    // }

    // onSearchSubmit(args): void{
    //     let searchBar = <SearchBar>args.object;
    //     this._listActivities = [];
    //     this.page.actionBarHidden = false;
    //     this._isLoading = true;
    //     this._activityListService.load('activities/' + searchBar.text)
    //      .subscribe(loadedActivities => {
    //          loadedActivities.forEach((listActivityObject) => {
    //             this._listActivities.unshift(listActivityObject);
    //          });
    //          this._isLoading = false;
    //     });
    // }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
