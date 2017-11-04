import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICarrier } from './carrier.model'
import { Http, Response} from '@angular/http'
import { HttpUtilService} from '../shared/http-util.service'

@Injectable()
export class CarrierService {
    private api = 'carriers';
    
    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(carrier: ICarrier): Observable<ICarrier> {
        if (carrier.id === 0) return this.create(carrier);
       
        return this.update(carrier);
    }  

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(carrier: ICarrier): Observable<ICarrier> {
        carrier.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), carrier, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }
    
    private update(carrier: ICarrier): Observable<ICarrier> {
        return this.http.put(this.httpUtil.url(this.api + '/' + carrier.id), carrier, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }
   
    getAll(): Observable<ICarrier[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICarrier[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICarrier> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICarrier>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}