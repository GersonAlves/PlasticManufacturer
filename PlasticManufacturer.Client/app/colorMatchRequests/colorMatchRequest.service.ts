import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IColorMatchRequest } from './colorMatchRequest.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class ColorMatchRequestService {
    private api = 'colorMatchRequests';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(colorMatchRequest: IColorMatchRequest): Observable<IColorMatchRequest> {
        if (colorMatchRequest.id === 0) return this.create(colorMatchRequest);

        return this.update(colorMatchRequest);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(colorMatchRequest: IColorMatchRequest): Observable<IColorMatchRequest> {
        colorMatchRequest.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), colorMatchRequest, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(colorMatchRequest: IColorMatchRequest): Observable<IColorMatchRequest> {
        return this.http.put(this.httpUtil.url(this.api + '/' + colorMatchRequest.id), colorMatchRequest, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IColorMatchRequest[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IColorMatchRequest[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IColorMatchRequest> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IColorMatchRequest>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}