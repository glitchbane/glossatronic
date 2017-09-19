
import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response} from "@angular/http";

import {Observable} from "rxjs";



import {User, UserData} from "../../models/user/user.model";
import {ApiHelper} from "../api-helper"

@Injectable()
export class UserDataService {
    helper: ApiHelper;
    constructor (private http: Http) {
       this.helper = new ApiHelper(this.http);
    }

    LoginUser (userEmail: string): Observable<UserData> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('email', userEmail);

        return this.http.get(this.helper.setUrl('/users'), this.helper.getOptionsWithSearch(params))
            .map((response: Response) => response.json())
                   .catch((error: Response) => Observable.throw(error.json()));
    }

    SaveNewUser(user: User): Observable<any> {

        return this.submitUsersApiRequest(JSON.stringify(user), '', this.helper.POST);
    }

    UpdateUser(user: User): Observable<User> {

        return this.submitUsersApiRequest(JSON.stringify(user), '/ + user.id', this.helper.PATCH);
    }

    LogoutUser(userEmail: string): Observable<any> {

        return this.submitUsersApiRequest({"userEmail": userEmail}, '/logout', this.helper.POST);
    }

    submitUsersApiRequest(body: any, api: string, method: string) {
        return this.helper.submitApiRequest(this.helper.USERS_API_PREFIX, body, api, method)
    }


}