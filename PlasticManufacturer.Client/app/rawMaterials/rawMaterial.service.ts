import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IRawMaterial } from './rawMaterial.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class RawMaterialService {
    private api = 'rawMaterials';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(rawMaterial: IRawMaterial): Observable<IRawMaterial> {
        if (rawMaterial.id === 0) return this.create(rawMaterial);

        return this.update(rawMaterial);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(rawMaterial: IRawMaterial): Observable<IRawMaterial> {
        rawMaterial.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), rawMaterial, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(rawMaterial: IRawMaterial): Observable<IRawMaterial> {
        return this.http.put(this.httpUtil.url(this.api + '/' + rawMaterial.id), rawMaterial, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IRawMaterial[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IRawMaterial[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IRawMaterial> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IRawMaterial>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}