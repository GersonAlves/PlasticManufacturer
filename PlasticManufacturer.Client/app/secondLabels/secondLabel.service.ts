import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ISecondLabel } from './secondLabel.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class SecondLabelService {
    private api = 'secondLabels';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(secondLabel: ISecondLabel): Observable<ISecondLabel> {
        if (secondLabel.id === 0) return this.create(secondLabel);

        return this.update(secondLabel);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(secondLabel: ISecondLabel): Observable<ISecondLabel> {
        secondLabel.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), secondLabel, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(secondLabel: ISecondLabel): Observable<ISecondLabel> {
        return this.http.put(this.httpUtil.url(this.api + '/' + secondLabel.id), secondLabel, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ISecondLabel[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ISecondLabel[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ISecondLabel> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ISecondLabel>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}