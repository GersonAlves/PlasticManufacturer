import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import {ICustomer} from './customer.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class customerService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/customers';
    private baseUrl = 'http://localhost:55751/api/customers';

    constructor(private http: Http) { }

    save(customer: ICustomer): Observable<ICustomer> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (customer.id === 0) {
            return this.create(customer, options);
        }
        return this.update(customer, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(customer: ICustomer, options: RequestOptions): Observable<ICustomer> {
        customer.id = undefined;
        return this.http.post(this.baseUrl, customer, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(customer: ICustomer, options: RequestOptions): Observable<ICustomer> {
        const url = `${this.baseUrl}/${customer.id}`;
        return this.http.put(url, customer, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<ICustomer[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ICustomer[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ICustomer> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ICustomer>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}