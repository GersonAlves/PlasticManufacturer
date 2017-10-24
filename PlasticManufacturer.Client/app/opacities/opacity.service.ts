import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IOpacity } from './opacity.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class OpacityService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/opacities';
    private baseUrl = 'http://test.api.newfdplastics.com/api/opacities';

    constructor(private http: Http) { }

    save(opacity: IOpacity): Observable<IOpacity> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (opacity.id === 0) {
            return this.create(opacity, options);
        }
        return this.update(opacity, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(opacity: IOpacity, options: RequestOptions): Observable<IOpacity> {
        opacity.id = undefined;
        return this.http.post(this.baseUrl, opacity, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(opacity: IOpacity, options: RequestOptions): Observable<IOpacity> {
        const url = `${this.baseUrl}/${opacity.id}`;
        return this.http.put(url, opacity, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<IOpacity[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <IOpacity[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<IOpacity> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <IOpacity>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}