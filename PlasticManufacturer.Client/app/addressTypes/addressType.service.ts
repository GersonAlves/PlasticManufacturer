import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IAddressType } from './addressType.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class AddressTypeService {
    private api = 'addressTypes';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(addressType: IAddressType): Observable<IAddressType> {
        if (addressType.id === 0) return this.create(addressType);

        return this.update(addressType);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(addressType: IAddressType): Observable<IAddressType> {
        addressType.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), addressType, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(addressType: IAddressType): Observable<IAddressType> {
        return this.http.put(this.httpUtil.url(this.api + '/' + addressType.id), addressType, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IAddressType[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IAddressType[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IAddressType> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IAddressType>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}