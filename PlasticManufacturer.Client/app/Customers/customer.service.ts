import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomer } from './customer.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class CustomerService {
    private api = 'customers';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(customer: ICustomer): Observable<ICustomer> {

        if (customer.id === 0) {
            return this.create(customer);
        }
        return this.update(customer);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(customer: ICustomer): Observable<ICustomer> {
        customer.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), customer, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(customer: ICustomer): Observable<ICustomer> {
        return this.http.put(this.httpUtil.url(this.api + '/' + customer.id), customer, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICustomer[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICustomer[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICustomer> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICustomer>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}