import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerContacted } from './customerContacted.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'


@Injectable()
export class CustomerContactedService {
    private api = 'CustomerContacteds';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(customerContacted: ICustomerContacted): Observable<ICustomerContacted> {
        if (customerContacted.id === 0) {
            return this.create(customerContacted);
        }
        return this.update(customerContacted);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(customerContacted: ICustomerContacted): Observable<ICustomerContacted> {
        customerContacted.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), customerContacted, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(customerContacted: ICustomerContacted): Observable<ICustomerContacted> {
        return this.http.put(this.httpUtil.url(this.api + '/' + customerContacted.id), customerContacted, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICustomerContacted[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICustomerContacted[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICustomerContacted> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICustomerContacted>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}