import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerStatus } from './customer-status.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class CustomerStatusService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/customerStatus';
    private baseUrl = 'http://test.api.newfdplastics.com/api/customerStatus';

    constructor(private http: Http) { }

    save(customerStatus: ICustomerStatus): Observable<ICustomerStatus> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (customerStatus.id === 0) {
            return this.create(customerStatus, options);
        }
        return this.update(customerStatus, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

     create(customerStatus: ICustomerStatus, options: RequestOptions): Observable<ICustomerStatus> {
        customerStatus.id = undefined;
        return this.http.post(this.baseUrl, customerStatus, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

     update(customerStatus: ICustomerStatus, options: RequestOptions): Observable<ICustomerStatus> {
        const url = `${this.baseUrl}/${customerStatus.id}`;
        return this.http.put(url, customerStatus, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<ICustomerStatus[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ICustomerStatus[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ICustomerStatus> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ICustomerStatus>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}