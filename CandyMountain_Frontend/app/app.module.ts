import { NgModule, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { LISTVIEW_DIRECTIVES } from 'nativescript-pro-ui/listview/angular';
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import * as platform from "platform";

import { ActivityListService } from "./shared/list/activity-list.service";
import { ActivityService } from "./shared/list/activity.service";
import { UserService } from "./shared/user/user.service";

declare var GMSServices: any;

if(platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyA24RXkGEIcpkHaIt7xi7D1SqyhEowyai4");
}

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptUISideDrawerModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader}, ActivityListService, ActivityService, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}