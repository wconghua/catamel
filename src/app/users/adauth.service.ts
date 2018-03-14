import { Injectable, Inject } from '@angular/core';
import {
    Http,
    Response,
    Headers
} from '@angular/http';
import { LoopBackConfig } from 'shared/sdk/lb.config';
import {Observable} from 'rxjs/Rx';
import { APP_CONFIG, AppConfig } from '../app-config.module';

/**
 * Handles log in requests for AD and Functional users
 * @export
 * @class ADAuthService
 */
@Injectable()
export class ADAuthService {

    constructor(
        public http: Http,
        @Inject(APP_CONFIG) private config: AppConfig
    ) {}

    /**
     * Logs a user in using either AD
     * or falling back to functional if the boolean is false
     * @param {string} username
     * @param {string} password2
     * @param {boolean} [activeDir=true]
     * @returns {Observable<Response>}
     * @memberof ADAuthService
     */
    login(username: string, password: string): Observable<Response> {
        const creds = 'username=' + username + '&password=' + password;
        const headers = new Headers();
        const url = LoopBackConfig.getPath() + this.config.externalAuthEndpoint;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, creds, {headers});
    }
}