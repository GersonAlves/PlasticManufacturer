import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IOpacity } from './opacity.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class OpacityService {
    private api = 'opacities';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(opacity: IOpacity): Observable<IOpacity> {

        if (opacity.id === 0) {
            return this.create(opacity);
        }
        return this.update(opacity);
    }

    delete(id: number): Observable<Response> {
         return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(opacity: IOpacity): Observable<IOpacity> {
        opacity.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), opacity, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(opacity: IOpacity): Observable<IOpacity> {
        return this.http.put(this.httpUtil.url(this.api + '/' + opacity.id), opacity, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IOpacity[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IOpacity[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IOpacity> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IOpacity>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}