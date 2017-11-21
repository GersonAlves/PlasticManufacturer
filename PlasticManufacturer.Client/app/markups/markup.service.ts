import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IMarkup } from './markup.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class MarkupService {
    private api = 'markups';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(markup: IMarkup): Observable<IMarkup> {

        if (markup.id === 0) {
            return this.create(markup);
        }
        return this.update(markup);
    }

    delete(id: number): Observable<Response> {

        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(markup: IMarkup): Observable<IMarkup> {
        markup.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), markup, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(markup: IMarkup): Observable<IMarkup> {
        return this.http.put(this.httpUtil.url(this.api + '/' + markup.id), markup, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IMarkup[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IMarkup[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IMarkup> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IMarkup>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}