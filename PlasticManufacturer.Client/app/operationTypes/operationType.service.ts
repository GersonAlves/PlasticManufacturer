import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IOperationType } from './operationType.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class OperationTypeService {
    private api = 'operationTypes';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(operationType: IOperationType): Observable<IOperationType> {
        if (operationType.id === 0) return this.create(operationType);

        return this.update(operationType);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(operationType: IOperationType): Observable<IOperationType> {
        operationType.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), operationType, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(operationType: IOperationType): Observable<IOperationType> {
        return this.http.put(this.httpUtil.url(this.api + '/' + operationType.id), operationType, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IOperationType[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IOperationType[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IOperationType> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IOperationType>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}