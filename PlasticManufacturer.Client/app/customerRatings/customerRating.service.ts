import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerRating } from './customerRating.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class CustomerRatingService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/customerRatings';
    private baseUrl = 'http://test.api.newfdplastics.com/api/customerRatings';
    
    constructor(private http: Http) { }

    save(customerRating: ICustomerRating): Observable<ICustomerRating> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (customerRating.id === 0) {
            return this.create(customerRating, options);
        }
        return this.update(customerRating, options);
    }   

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(customerRating: ICustomerRating, options: RequestOptions): Observable<ICustomerRating> {
        customerRating.id = undefined;
        return this.http.post(this.baseUrl, customerRating, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
    
    private update(customerRating: ICustomerRating, options: RequestOptions): Observable<ICustomerRating> {
        const url = `${this.baseUrl}/${customerRating.id}`;
        return this.http.put(url, customerRating, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
   
    getAll(): Observable<ICustomerRating[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ICustomerRating[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ICustomerRating> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ICustomerRating>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}