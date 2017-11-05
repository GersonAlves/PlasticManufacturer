import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICustomerStatus } from './customer-status.model'
import { Http, Response} from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class CustomerStatusService {
    private api = 'customerStatus';

    constructor(private http: Http, private httpUtil: HttpUtilService ) { }

    save(customerStatus: ICustomerStatus): Observable<ICustomerStatus> {

        if (customerStatus.status_id === 0) {
            return this.create(customerStatus);
        }
        return this.update(customerStatus);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    create(customerStatus: ICustomerStatus): Observable<ICustomerStatus> {
        customerStatus.status_id = undefined;
        return this.http.post(this.httpUtil.url(this.api), customerStatus, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    update(customerStatus: ICustomerStatus): Observable<ICustomerStatus> {
        return this.http.put(this.httpUtil.url(this.api + '/' + customerStatus.status_id), customerStatus, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICustomerStatus[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICustomerStatus[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICustomerStatus> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICustomerStatus>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}