import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerAddress } from './customerAddress.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class CustomerAddressService {
    private api = 'customerAddresses';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(customerAddress: ICustomerAddress): Observable<ICustomerAddress> {
        if (customerAddress.id === 0) return this.create(customerAddress);

        return this.update(customerAddress);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(customerAddress: ICustomerAddress): Observable<ICustomerAddress> {
        customerAddress.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), customerAddress, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(customerAddress: ICustomerAddress): Observable<ICustomerAddress> {
        return this.http.put(this.httpUtil.url(this.api + '/' + customerAddress.id), customerAddress, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICustomerAddress[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICustomerAddress[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICustomerAddress> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICustomerAddress>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}