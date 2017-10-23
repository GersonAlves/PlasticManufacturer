import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICarrier } from './carrier.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class CarrierService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/carriers';
    private baseUrl = 'http://localhost:55751/api/carriers';
    
    constructor(private http: Http) { }

    save(carrier: ICarrier): Observable<ICarrier> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (carrier.id === 0) {
            return this.create(carrier, options);
        }
        return this.update(carrier, options);
    }   

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(carrier: ICarrier, options: RequestOptions): Observable<ICarrier> {
        carrier.id = undefined;
        return this.http.post(this.baseUrl, carrier, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
    
    private update(carrier: ICarrier, options: RequestOptions): Observable<ICarrier> {
        const url = `${this.baseUrl}/${carrier.id}`;
        return this.http.put(url, carrier, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
   
    getAll(): Observable<ICarrier[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ICarrier[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ICarrier> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ICarrier>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}