import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IGender } from './gender.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class GenderService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/genders';
    private baseUrl = 'http://test.api.newfdplastics.com/api/genders';

    constructor(private http: Http) { }

    save(gender: IGender): Observable<IGender> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (gender.id === 0) {
            return this.create(gender, options);
        }
        return this.update(gender, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(gender: IGender, options: RequestOptions): Observable<IGender> {
        gender.id = undefined;
        return this.http.post(this.baseUrl, gender, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(gender: IGender, options: RequestOptions): Observable<IGender> {
        const url = `${this.baseUrl}/${gender.id}`;
        return this.http.put(url, gender, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<IGender[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <IGender[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<IGender> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <IGender>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}