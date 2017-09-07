import {User, UserData} from "../../models/user/user.model";
import {Action} from "@ngrx/store";
import {USER_LOGIN_SUCCESS, UserLoginSuccessAction} from "./user.actions";
import {USER_LOGIN_FAILURE} from "./user.actions";
import {LOGOUT_USER_SUCCESS} from "./user.actions";
import {createSelector} from 'reselect';
import {isBoolean} from 'util';

export interface UserState {
    authenticatedUserId: number;
    ids: number[];
    entities: User[];
    selectedId: number;
}

const initialState: UserState = {
    authenticatedUserId: null,
    ids       : [],
    entities  : [],
    selectedId: null
};

export function reducer (state = initialState, action: Action): UserState {
    let newState: UserState;

    switch (action.type) {

        case USER_LOGIN_SUCCESS: {
            let thisAction: UserLoginSuccessAction = action as UserLoginSuccessAction,
                  userData: UserData = thisAction.payload;

            const user: User = {
                id: userData.user_id,
                firstName: userData.first_name,
                lastName: userData.last_name,
                email: userData.email,
                roleId: userData.user_role_id
            };

            console.log(user);
            if (state.ids.indexOf(user.id) > -1) {
                return state;
            }

            newState =   {
                authenticatedUserId: user.id,
                ids       : [user.id],
                entities  : <any>Object.assign({}, state.entities, {[user.id]: user}),
                selectedId: user.id
            };

            console.log(newState);

            break;
        }


      case  USER_LOGIN_FAILURE: {
        // const user: User = action.payload;

        console.log('load user failed');
        // effects module will create user.  There are two likely scenarios under which the load user would fail:
        //   1. the user isn't found in the db (we reset or moved a db,etc)
        //   2. the server is failing, in which case the create user will also fail.
        newState = state;

        break;
      }

      case LOGOUT_USER_SUCCESS: {

            newState = {
                authenticatedUserId: null,
                ids       : null,
                entities  : [<any>Object.assign({}, null)],
                selectedId: null
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


    export const getEntities = (state: UserState) => state.entities;

    export const getIds = (state: UserState) => state.ids;

    export const getSelectedId = (state: UserState) => state.selectedId;

    export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
        return entities[selectedId];
    });

    export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
        return ids.map(id => entities[id]);
    });
