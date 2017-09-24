
import {Action} from "@ngrx/store";
import {User, UserData} from "../../models/user/user.model";


export const LOGIN_USER           = '[User] Login User';
export const USER_LOGIN_SUCCESS   = '[User] User Login Success';
export const USER_LOGIN_FAILURE   = '[User] User Login Failure';

export const ADD_NEW_USER         = '[User] Add new User';
export const ADD_NEW_USER_SUCCESS = '[User] Add new User Success';
export const ADD_NEW_USER_FAILURE = '[User] Add new User Failure';

export const UPDATE_USER          = '[User] Update User';
export const UPDATE_USER_SUCCESS  = '[User] Update User Success';
export const UPDATE_USER_FAILURE  = '[User] Update User Failure';

export const LOGOUT_USER         = '[User] Logout User';
export const LOGOUT_USER_SUCCESS = '[User] Logout User Success';
export const LOGOUT_USER_FAILURE = '[User] Logout User Failure';

export const LOGIN_COMPLETE = '[User] Login Complete';

export class LoginCompleteAction implements Action {
    type = LOGIN_COMPLETE;
    
}

export class LoginUserAction implements Action {
    type = LOGIN_USER;

    // payload is email
    constructor(public payload: string) {
    }
}

export class UserLoginFailureAction implements Action {
    type = USER_LOGIN_FAILURE;

    constructor(public payload: string) {
    }
}

export class UserLoginSuccessAction implements Action {
    type = USER_LOGIN_SUCCESS;

    constructor(public payload: UserData[]) {
    }
}

export class AddNewUserAction implements Action {
    type = ADD_NEW_USER;

    constructor(public payload: User) {
    }
}

export class AddNewUserSuccessAction implements Action {
    type = ADD_NEW_USER_SUCCESS;

    constructor(public payload: UserData) {
    }
}

export class AddNewUserFailureAction implements Action {
    type = ADD_NEW_USER_FAILURE;

    constructor(public payload: any) {
    }
}

export class UpdateUserAction implements Action {
    type = UPDATE_USER;

    constructor(public payload: User) {
    }
}

export class UpdateUserSuccessAction implements Action {
    type = UPDATE_USER_SUCCESS;

    constructor(public payload: UserData) {
    }
}

export class UpdateUserFailureAction implements Action {
    type = UPDATE_USER_FAILURE;

    constructor(public payload: any) {
    }
}

export class LogoutUserAction implements Action {
    type = LOGOUT_USER;

    constructor(public payload: string) { // user email
    }
}

export class LogoutUserSuccessAction implements Action {
    type = LOGOUT_USER_SUCCESS;

}

export class LogoutUserFailureAction implements Action {
    type = LOGOUT_USER_FAILURE;

    constructor(public payload: any) {
    }
}

