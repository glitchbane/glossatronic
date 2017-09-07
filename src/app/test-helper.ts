import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';

@Injectable()
export class StoreMockService extends BehaviorSubject<any> {
    constructor() {
        super(null);
    }

    dispatch(action: any) {}

    select(fn) {
        // return this.map(x => 1);
        return 1;
    }
}