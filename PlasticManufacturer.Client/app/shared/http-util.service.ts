import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpUtilService {

    private API_URL = 'http://hml.api.newfdplastics.com/api/';
   // private API_URL = 'http://test.api.newfdplastics.com/api/';
    //private API_URL = 'http://localhost:55751/api/';

    url(path: string) {
        return this.API_URL + path;
    }

    headers() {
        let headersParams = { 'Content-Type': 'application/json'};
        if (localStorage['token']) {
            headersParams['Authorization'] = localStorage['token'];
        }
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    extrairDados(response: Response) {
        let data = response.json();
        return data || {};
    }

    processarErros(error: Response) {
        return Observable.throw('Erro acessando servidor remoto. ' + error.statusText);
    }
}