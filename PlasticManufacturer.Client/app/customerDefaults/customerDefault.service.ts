import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerDefault } from './customerDefault.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'


@Injectable()
export class CustomerDefaultService {

    private api = 'customerDefaults';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(customerDefault: ICustomerDefault): Observable<ICustomerDefault> {
        if (customerDefault.id === 0) {
            return this.create(customerDefault);
        }
        return this.update(customerDefault);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(customerDefault: ICustomerDefault): Observable<ICustomerDefault> {
        customerDefault.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), customerDefault, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(customerDefault: ICustomerDefault): Observable<ICustomerDefault> {
        return this.http.put(this.httpUtil.url(this.api + '/' + customerDefault.id), customerDefault, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICustomerDefault[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICustomerDefault[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICustomerDefault> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICustomerDefault>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}