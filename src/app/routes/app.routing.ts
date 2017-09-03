

import {RouterModule, Routes} from "@angular/router";

const APP_ROOT_ROUTES = [
    {path: '', redirectTo: 'start', pathMatch: 'full'},
    {path: 'index.html', redirectTo: 'start', pathMatch: 'full'},
    // {path: 'start', component: StartComponent},
    // {path: 'user', component: UserContainerComponent},



];

export const routing = RouterModule.forRoot(APP_ROOT_ROUTES);