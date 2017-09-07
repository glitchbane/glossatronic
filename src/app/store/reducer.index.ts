
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import * as routerReducer from '@ngrx/router-store';
import * as userReducer from './user/user.reducer';
import * as uiReducer from './ui/ui.reducer';
import {createSelector} from "reselect";


export interface State {
    ui:     uiReducer.UiState;
    router: routerReducer.RouterReducerState;
    user:   userReducer.UserState;
}

export const reducers = {
    ui: uiReducer.reducer,
    router: routerReducer.routerReducer,
    user: userReducer.reducer
};

export const getUsersState = (state: State) =>  state.user;


export const getUserEntities = createSelector(getUsersState, userReducer.getEntities);
export const getUserIds = createSelector(getUsersState, userReducer.getIds);
export const getSelectedUserId = createSelector(getUsersState, userReducer.getSelectedId);
export const getSelectedUser = createSelector(getUsersState, userReducer.getSelected);



