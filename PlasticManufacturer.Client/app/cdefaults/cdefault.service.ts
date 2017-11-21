import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICdefault } from './cdefault.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class CdefaultService {
    private api = 'cdefaults';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(cdefault: ICdefault): Observable<ICdefault> {

        if (cdefault.id === 0) {
            return this.create(cdefault);
        }
        return this.update(cdefault);
    }

    delete(id: number): Observable<Response> {

        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(cdefault: ICdefault): Observable<ICdefault> {
        cdefault.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), cdefault, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(cdefault: ICdefault): Observable<ICdefault> {
        return this.http.put(this.httpUtil.url(this.api + '/' + cdefault.id), cdefault, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICdefault[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICdefault[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICdefault> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICdefault>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}