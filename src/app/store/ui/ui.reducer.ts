import {Action} from '@ngrx/store';
import {USER_AUTHENTICATED, USER_UNAUTHENTICATED, UserAuthenticatedAction} from './ui.actions';
import {isNullOrUndefined} from 'util';


export interface UiState {
    authenticatedUserId: number;
}

const initialState: UiState = {
    authenticatedUserId: null,
};

export function reducer (state = initialState, action: Action): UiState {
    let newState: UiState;

    switch (action.type) {

        case USER_AUTHENTICATED: {
            const thisAction: UserAuthenticatedAction = action as UserAuthenticatedAction,
                  userId: number = thisAction.payload;

            newState =   {
                authenticatedUserId: userId,
            };

            console.log(newState);

            break;
        }

        case USER_UNAUTHENTICATED: {

            newState = {
                authenticatedUserId: null,
            };

            break;
        }

        default: {
            newState = state;

            break;
        }
    }

    return newState;
}


export const getAuthenticatedUserId = (state: UiState) => state.authenticatedUserId;
export const getIsUserAuthenticated = (state: UiState) => !isNullOrUndefined(state.authenticatedUserId);

