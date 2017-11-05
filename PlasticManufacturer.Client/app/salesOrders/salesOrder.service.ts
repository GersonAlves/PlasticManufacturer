import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ISalesOrder } from './salesOrder.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class SalesOrderService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/salesOrders';
    private baseUrl = 'http://test.api.newfdplastics.com/api/salesOrders';

    constructor(private http: Http) { }

    save(salesOrder: ISalesOrder): Observable<ISalesOrder> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (salesOrder.id === 0) {
            return this.create(salesOrder, options);
        }
        return this.update(salesOrder, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(salesOrder: ISalesOrder, options: RequestOptions): Observable<ISalesOrder> {
        salesOrder.id = undefined;
        return this.http.post(this.baseUrl, salesOrder, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(salesOrder: ISalesOrder, options: RequestOptions): Observable<ISalesOrder> {
        const url = `${this.baseUrl}/${salesOrder.id}`;
        return this.http.put(url, salesOrder, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<ISalesOrder[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ISalesOrder[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ISalesOrder> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ISalesOrder>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}