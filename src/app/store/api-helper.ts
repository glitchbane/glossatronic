

import {Headers, RequestOptions, Response, Http, ResponseContentType} from "@angular/http";
import {config} from "../app.config";
import {Observable} from "rxjs";


export class ApiHelper {


    public USERS_API_PREFIX: string = '/users';

    public POST: string   = 'post';
    public GET: string    = 'get';
    public PATCH: string  = 'patch';
    public PUT: string    = 'put';
    public DELETE: string = 'delete';
    public constructor(private http: Http){}


    public getOptions(): RequestOptions {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return options;
    }

    public getOptionsWithSearch(searchParams): RequestOptions {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({
            headers: headers,
            search: searchParams,
            responseType: ResponseContentType.Json
        });

        return options;
    }


    public setError(message: string): Error {

        let error: Error = new Error();
        error.message    = message;
        return error;
    }


    public setUrl(path: string): string {

        return config.API_URL + path;

    }


    public submitApiRequest(prefix: string, body: any, api: string, method: string) {

        switch (method) {
            case this.GET:
                return this.http.get(this.setUrl(`${prefix}${api}`), this.getOptions())
                           .map((response: Response) => response.json())
                           .catch((error: Response) => Observable.throw(error.json()));
            case this.POST:
                return this.http.post(this.setUrl(`${prefix}${api}`), body, this.getOptions())
                           .map((response: Response) => response.json())
                           .catch((error: Response) => Observable.throw(error.json()));

            case this.PUT:
                return this.http.put(this.setUrl(`${prefix}${api}`), body, this.getOptions())
                           .map((response: Response) => response.json())
                           .catch((error: Response) => Observable.throw(error.json()));

            case this.PATCH:
                return this.http.patch(this.setUrl(`${prefix}${api}`), body, this.getOptions())
                           .map((response: Response) => response.json())
                           .catch((error: Response) => Observable.throw(error.json()));

            case this.DELETE:
                return this.http.delete(this.setUrl(`${prefix}${api}`), this.getOptions())
                           .map((response: Response) => response.json())
                           .catch((error: Response) => Observable.throw(error.json()));
        }
    }
}