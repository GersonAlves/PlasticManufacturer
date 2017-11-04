import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerRating } from './customerRating.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class CustomerRatingService {
    private api = 'customerRatings';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(customerRating: ICustomerRating): Observable<ICustomerRating> {

        if (customerRating.id === 0) {
            return this.create(customerRating);
        }
        return this.update(customerRating);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(customerRating: ICustomerRating): Observable<ICustomerRating> {
        customerRating.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), customerRating, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(customerRating: ICustomerRating): Observable<ICustomerRating> {
        return this.http.put(this.httpUtil.url(this.api + '/' + customerRating.id), customerRating, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICustomerRating[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICustomerRating[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICustomerRating> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICustomerRating>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}