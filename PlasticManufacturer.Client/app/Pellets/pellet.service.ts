import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IPellet } from './pellet.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class PelletService {
    private api = 'pellets';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(pellet: IPellet): Observable<IPellet> {
        if (pellet.id === 0) return this.create(pellet);

        return this.update(pellet);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(pellet: IPellet): Observable<IPellet> {
        pellet.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), pellet, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(pellet: IPellet): Observable<IPellet> {
        return this.http.put(this.httpUtil.url(this.api + '/' + pellet.id), pellet, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IPellet[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IPellet[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IPellet> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IPellet>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}