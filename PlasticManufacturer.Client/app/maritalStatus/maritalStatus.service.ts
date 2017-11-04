import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IMaritalStatus } from './maritalStatus.model'
import { Http, Response} from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class MaritalStatusService {

    private api = 'maritalStatus';
    
    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(maritalStatus: IMaritalStatus): Observable<IMaritalStatus> {

        if (maritalStatus.id === 0) {
            return this.create(maritalStatus);
        }
        return this.update(maritalStatus);
    }   

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(maritalStatus: IMaritalStatus): Observable<IMaritalStatus> {
        maritalStatus.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), maritalStatus, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }
    
    private update(maritalStatus: IMaritalStatus): Observable<IMaritalStatus> {
        return this.http.put(this.httpUtil.url(this.api + '/' + maritalStatus.id), maritalStatus, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }
   
    getAll(): Observable<IMaritalStatus[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IMaritalStatus[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IMaritalStatus> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IMaritalStatus>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}