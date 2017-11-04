import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IGender } from './gender.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class GenderService {
    private api = 'genders';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(gender: IGender): Observable<IGender> {
        if (gender.id === 0) {
            return this.create(gender);
        }
        return this.update(gender);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(gender: IGender): Observable<IGender> {
        gender.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), gender, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(gender: IGender): Observable<IGender> {

        return this.http.put(this.httpUtil.url(this.api + '/' + gender.id), gender, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IGender[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IGender[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IGender> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IGender>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}