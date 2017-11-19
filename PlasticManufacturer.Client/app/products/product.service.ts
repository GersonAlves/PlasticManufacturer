import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IProduct } from './product.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class ProductService {
    private api = 'products';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(product: IProduct): Observable<IProduct> {
        if (product.id === 0) return this.create(product);

        return this.update(product);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(product: IProduct): Observable<IProduct> {
        product.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), product, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(product: IProduct): Observable<IProduct> {
        return this.http.put(this.httpUtil.url(this.api + '/' + product.id), product, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IProduct[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IProduct[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IProduct> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IProduct>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}