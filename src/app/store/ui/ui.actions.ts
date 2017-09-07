import {Action} from '@ngrx/store';

export const USER_AUTHENTICATED   = '[Ui] User Authenticated';
export const USER_UNAUTHENTICATED = '[Ui] User Unauthenticated';


export class UserAuthenticatedAction implements Action {
    type = USER_AUTHENTICATED;

    // payload is user id
    constructor(public payload: number) {
    }
}

export class UserUnauthenticatedAction implements Action {
    type = USER_UNAUTHENTICATED;

}