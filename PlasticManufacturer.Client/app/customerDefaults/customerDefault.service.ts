import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerDefault } from './customerDefault.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class CustomerDefaultService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/customerDefaults';
    private baseUrl = 'http://test.api.newfdplastics.com/api/customerDefaults';
    
    constructor(private http: Http) { }

    save(customerDefault: ICustomerDefault): Observable<ICustomerDefault> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (customerDefault.id === 0) {
            return this.create(customerDefault, options);
        }
        return this.update(customerDefault, options);
    }   

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(customerDefault: ICustomerDefault, options: RequestOptions): Observable<ICustomerDefault> {
        customerDefault.id = undefined;
        return this.http.post(this.baseUrl, customerDefault, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
    
    private update(customerDefault: ICustomerDefault, options: RequestOptions): Observable<ICustomerDefault> {
        const url = `${this.baseUrl}/${customerDefault.id}`;
        return this.http.put(url, customerDefault, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
   
    getAll(): Observable<ICustomerDefault[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ICustomerDefault[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ICustomerDefault> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ICustomerDefault>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}