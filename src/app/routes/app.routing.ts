

import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from '../auth/auth.component';
import {GlossaryContainerComponent} from '../features/glossary/glossary-container/glossary-container.component';

const APP_ROOT_ROUTES = [
    // {path: '', redirectTo: 'start', pathMatch: 'full'},
    // {path: 'index.html', redirectTo: 'start', pathMatch: 'full'},
    {path: 'login', component: AuthComponent},
    {path: 'glossary', component: GlossaryContainerComponent},



];

export const routing = RouterModule.forRoot(APP_ROOT_ROUTES);