

import {Injectable} from "@angular/core";

import {UserDataService} from "./user.data.service";
import {Observable} from "rxjs";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import {Effect, Actions} from "@ngrx/effects";


import {Action} from "@ngrx/store";
import {of} from "rxjs/observable/of";

import {
    LOGIN_USER,
    LoginCompleteAction,
    USER_LOGIN_SUCCESS,
    LoginUserAction,
    UserLoginSuccessAction,
    UserLoginFailureAction,
    UPDATE_USER,
    UpdateUserAction,
    AddNewUserSuccessAction,
    AddNewUserFailureAction,
    LOGOUT_USER,
    LogoutUserAction,
    LogoutUserSuccessAction,
    LogoutUserFailureAction, ADD_NEW_USER
} from './user.actions';
import {UserAuthenticatedAction, UserUnauthenticatedAction} from '../ui/ui.actions';


@Injectable()
export class UserEffectsService {
    constructor( private userDataService: UserDataService,
                 private action$: Actions) {}

    @Effect()
    loginUser$: Observable<Action> = this.action$
        .ofType(LOGIN_USER)
        .debug("login user action received")
        .map((action: LoginUserAction) => action.payload)
        .mergeMap((email) =>

            this.userDataService.LoginUser(email)
                .debug ("data received from user service")
                .switchMap((data: any) => {
                    return [
                            new UserLoginSuccessAction(data.result),
                            new UserAuthenticatedAction(data.result.user_id)
                        ];
                })

                .catch(error => of(new UserLoginFailureAction(error)))
        );

    @Effect()
    loginSuccess$: Observable<Action> = this.action$
                                            .ofType(USER_LOGIN_SUCCESS)
                                            .map(() => new LoginCompleteAction());

    @Effect()
    addNewUser$: Observable<Action> = this.action$
        .ofType(ADD_NEW_USER)
        .map((action: UpdateUserAction) => action.payload)
        .mergeMap(user =>
            this.userDataService.SaveNewUser(user)
                .map((userData) => new AddNewUserSuccessAction(userData))
                .catch((e) => of(new AddNewUserFailureAction(e)))
        );

    @Effect()
    logoutUser$: Observable<Action> = this.action$
        .ofType(LOGOUT_USER)
        .map((action: LogoutUserAction) => action.payload)
        .mergeMap((userEmail: string) =>
            this.userDataService.LogoutUser(userEmail)
                .switchMap(() => {
                return [
                    new LogoutUserSuccessAction(),
                    new UserUnauthenticatedAction()
                ]
            })
                .catch((e) => of(new LogoutUserFailureAction(e)))
        );
}
