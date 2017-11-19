import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerResin } from './customerResin.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class CustomerResinService {
    private api = 'customerResins';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(customerResin: ICustomerResin): Observable<ICustomerResin> {
        if (customerResin.id === 0) return this.create(customerResin);

        return this.update(customerResin);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(customerResin: ICustomerResin): Observable<ICustomerResin> {
        customerResin.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), customerResin, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(customerResin: ICustomerResin): Observable<ICustomerResin> {
        return this.http.put(this.httpUtil.url(this.api + '/' + customerResin.id), customerResin, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICustomerResin[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICustomerResin[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICustomerResin> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICustomerResin>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}