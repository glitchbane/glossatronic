import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {reducers} from "./store/reducer.index";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {UserEffectsService} from "./store/user/user.effects.service";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {UserDataService} from "./store/user/user.data.service";
import {routing} from "./routes/app.routing";
import { AuthComponent } from './auth/auth.component';
import {AuthService} from './auth/auth.service';
import { GlossaryContainerComponent } from './features/glossary/glossary-container/glossary-container.component';
import { SecondaryNavComponentComponent } from './features/navigation/secondary-nav-component/secondary-nav-component.component';
import { PrimaryNavComponent } from './features/navigation/primary-nav/primary-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GlossaryContainerComponent,
    SecondaryNavComponentComponent,
    PrimaryNavComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      ReactiveFormsModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot(
          [
              UserEffectsService
          ]
      ),
      StoreRouterConnectingModule
  ],
  providers: [
      AuthService,
      UserDataService
  ],
  bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
