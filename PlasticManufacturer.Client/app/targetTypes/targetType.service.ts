import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ITargetType } from './targetType.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class TargetTypeService {
    private api = 'targetTypes';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(targetType: ITargetType): Observable<ITargetType> {
        if (targetType.id === 0) return this.create(targetType);

        return this.update(targetType);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(targetType: ITargetType): Observable<ITargetType> {
        targetType.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), targetType, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(targetType: ITargetType): Observable<ITargetType> {
        return this.http.put(this.httpUtil.url(this.api + '/' + targetType.id), targetType, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ITargetType[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ITargetType[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ITargetType> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ITargetType>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}