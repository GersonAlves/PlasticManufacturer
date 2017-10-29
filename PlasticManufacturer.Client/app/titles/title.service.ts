import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ITitle } from './title.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class TitleService {
    private api = 'titles';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(title: ITitle): Observable<ITitle> {
        if (title.id === 0) return this.create(title);

        return this.update(title);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(title: ITitle): Observable<ITitle> {
        title.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), title, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(title: ITitle): Observable<ITitle> {
        return this.http.put(this.httpUtil.url(this.api + '/' + title.id), title, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ITitle[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ITitle[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ITitle> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ITitle>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}