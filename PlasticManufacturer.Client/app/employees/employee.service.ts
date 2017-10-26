import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IEmployee } from './employee.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class EmployeeService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/employees';
    private baseUrl = 'http://test.api.newfdplastics.com/api/employees';

    constructor(private http: Http) { }

    save(employee: IEmployee): Observable<IEmployee> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (employee.id === 0) {
            return this.create(employee, options);
        }
        return this.update(employee, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(employee: IEmployee, options: RequestOptions): Observable<IEmployee> {
        employee.id = undefined;
        return this.http.post(this.baseUrl, employee, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(employee: IEmployee, options: RequestOptions): Observable<IEmployee> {
        const url = `${this.baseUrl}/${employee.id}`;
        return this.http.put(url, employee, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<IEmployee[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <IEmployee[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<IEmployee> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <IEmployee>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}