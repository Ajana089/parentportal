import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    //visibility: BehaviorSubject<boolean>;
    visibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.visibility = new BehaviorSubject(false);
    }

    show() {
        this.visibility.next(true);
        //this.visibility = new BehaviorSubject(true);
    }

    hide() {
        this.visibility.next(false);
    }
}