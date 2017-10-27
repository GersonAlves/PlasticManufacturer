import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IMaritalStatu } from './maritalStatu.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class MaritalStatuService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/maritalStatus';
    private baseUrl = 'http://test.api.newfdplastics.com/api/maritalStatus';
    
    constructor(private http: Http) { }

    save(maritalStatu: IMaritalStatu): Observable<IMaritalStatu> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (maritalStatu.id === 0) {
            return this.create(maritalStatu, options);
        }
        return this.update(maritalStatu, options);
    }   

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(maritalStatu: IMaritalStatu, options: RequestOptions): Observable<IMaritalStatu> {
        maritalStatu.id = undefined;
        return this.http.post(this.baseUrl, maritalStatu, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
    
    private update(maritalStatu: IMaritalStatu, options: RequestOptions): Observable<IMaritalStatu> {
        const url = `${this.baseUrl}/${maritalStatu.id}`;
        return this.http.put(url, maritalStatu, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
   
    getAll(): Observable<IMaritalStatu[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <IMaritalStatu[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<IMaritalStatu> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <IMaritalStatu>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}