import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICity } from './city.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'


@Injectable()
export class CityService {
    private api = 'cities';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(city: ICity): Observable<ICity> {
        if (city.id === 0) {
            return this.create(city);
        }
        return this.update(city);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(city: ICity): Observable<ICity> {
        city.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), city, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(city: ICity): Observable<ICity> {
        return this.http.put(this.httpUtil.url(this.api + '/' + city.id), city, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICity[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICity[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICity> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICity>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}