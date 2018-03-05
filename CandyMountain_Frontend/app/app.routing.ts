import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { MapComponent } from "./pages/map/map.component";
import { ActivitiesList } from "./pages/activity-list/activities-list.component";
import { ActivitiesListSearch } from "./pages/activity-list-search/activity-list-search.component"
import { ActivityDetail } from "./pages/activity-detail/activity-detail.component";

import {NativeScriptRouterModule} from "nativescript-angular/router";


export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "map", component: MapComponent},
  { path: "activity-list", component: ActivitiesList },
  { path: "activity-list-search/:search_word", component: ActivitiesListSearch},
  { path: "activity-detail/:id", component: ActivityDetail }
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  MapComponent,
  ActivitiesList,
  ActivitiesListSearch,
  ActivityDetail
];