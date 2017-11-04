import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IState } from './state.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class StateService {
    private api = 'states';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(state: IState): Observable<IState> {
        if (state.id === 0) return this.create(state);

        return this.update(state);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(state: IState): Observable<IState> {
        state.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), state, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(state: IState): Observable<IState> {
        return this.http.put(this.httpUtil.url(this.api + '/' + state.id), state, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IState[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IState[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IState> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IState>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}