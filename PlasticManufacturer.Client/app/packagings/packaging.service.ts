import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IPackaging } from './packaging.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class PackagingService {

    private api = 'packagings';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(packaging: IPackaging): Observable<IPackaging> {

        if (packaging.id === 0) {
            return this.create(packaging);
        }
        return this.update(packaging);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(packaging: IPackaging): Observable<IPackaging> {
        packaging.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), packaging, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(packaging: IPackaging): Observable<IPackaging> {
        return this.http.put(this.httpUtil.url(this.api + '/' + packaging.id), packaging, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IPackaging[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IPackaging[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IPackaging> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IPackaging>response.json();
        }).catch(this.httpUtil.processarErros);
    }


}