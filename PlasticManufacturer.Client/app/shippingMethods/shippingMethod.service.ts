import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IShippingMethod } from './shippingMethod.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class ShippingMethodService {
    private api = 'shippingMethods';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(shippingMethod: IShippingMethod): Observable<IShippingMethod> {
        if (shippingMethod.id === 0) return this.create(shippingMethod);

        return this.update(shippingMethod);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(shippingMethod: IShippingMethod): Observable<IShippingMethod> {
        shippingMethod.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), shippingMethod, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(shippingMethod: IShippingMethod): Observable<IShippingMethod> {
        return this.http.put(this.httpUtil.url(this.api + '/' + shippingMethod.id), shippingMethod, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IShippingMethod[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IShippingMethod[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IShippingMethod> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IShippingMethod>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}