import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IDepartment } from './department.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class DepartmentService {
    private api = 'departments';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(department: IDepartment): Observable<IDepartment> {
        if (department.id === 0) return this.create(department);

        return this.update(department);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(department: IDepartment): Observable<IDepartment> {
        department.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), department, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(department: IDepartment): Observable<IDepartment> {
        return this.http.put(this.httpUtil.url(this.api + '/' + department.id), department, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IDepartment[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IDepartment[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IDepartment> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IDepartment>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}