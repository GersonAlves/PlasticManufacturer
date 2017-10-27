import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICity } from './city.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class CityService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/cities';
    private baseUrl = 'http://test.api.newfdplastics.com/api/cities';

    constructor(private http: Http) { }

    save(city: ICity): Observable<ICity> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (city.id === 0) {
            return this.create(city, options);
        }
        return this.update(city, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(city: ICity, options: RequestOptions): Observable<ICity> {
        city.id = undefined;
        return this.http.post(this.baseUrl, city, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(city: ICity, options: RequestOptions): Observable<ICity> {
        const url = `${this.baseUrl}/${city.id}`;
        return this.http.put(url, city, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<ICity[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ICity[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ICity> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ICity>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}