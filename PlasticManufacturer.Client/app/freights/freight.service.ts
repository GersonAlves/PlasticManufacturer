import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IFreight } from './freight.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class FreightService {
    private api = 'freights';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(freight: IFreight): Observable<IFreight> {
        if (freight.id === 0) return this.create(freight);

        return this.update(freight);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(freight: IFreight): Observable<IFreight> {
        freight.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), freight, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(freight: IFreight): Observable<IFreight> {
        return this.http.put(this.httpUtil.url(this.api + '/' + freight.id), freight, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IFreight[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IFreight[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IFreight> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IFreight>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}