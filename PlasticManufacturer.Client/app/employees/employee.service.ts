import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IEmployee } from './employee.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class EmployeeService {
    private api = 'employees';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(employee: IEmployee): Observable<IEmployee> {

        if (employee.id === 0) {
            return this.create(employee);
        }
        return this.update(employee);
    }

    delete(id: number): Observable<Response> {

        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(employee: IEmployee): Observable<IEmployee> {
        employee.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), employee, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(employee: IEmployee): Observable<IEmployee> {
        return this.http.put(this.httpUtil.url(this.api + '/' + employee.id), employee, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IEmployee[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IEmployee[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IEmployee> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IEmployee>response.json();
        }).catch(this.httpUtil.processarErros);
    }


}