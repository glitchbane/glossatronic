
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import * as fromRouter from '@ngrx/router-store';
import * as fromUsers from './user/user.reducer';
import {createSelector} from "reselect";



/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface UiState {
    userId: number;
}
export interface State {
    router: fromRouter.RouterReducerState;
    user: fromUsers.UserState;
}

export const reducers = {
    router: fromRouter.routerReducer,
    user: fromUsers.reducer
};

export const getUsersState = (state: State) =>  state.user;


export const getUserEntities = createSelector(getUsersState, fromUsers.getEntities);
export const getUserIds = createSelector(getUsersState, fromUsers.getIds);
export const getSelectedUserId = createSelector(getUsersState, fromUsers.getSelectedId);
export const getSelectedUser = createSelector(getUsersState, fromUsers.getSelected);



