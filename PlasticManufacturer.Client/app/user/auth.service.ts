import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'


@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: Http) { }

    loginUser(userName: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let loginInfo = { username: userName, password: password };

    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        console.log('new name : ' + firstName)

        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        console.log(this.currentUser.lastName)
    }
}