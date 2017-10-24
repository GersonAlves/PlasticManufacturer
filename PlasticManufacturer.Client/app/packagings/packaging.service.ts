import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IPackaging } from './packaging.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class PackagingService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/packaging';
    private baseUrl = 'http://localhost:55751/api/packagings';

    constructor(private http: Http) { }

    save(packaging: IPackaging): Observable<IPackaging> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (packaging.id === 0) {
            return this.create(packaging, options);
        }
        return this.update(packaging, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(packaging: IPackaging, options: RequestOptions): Observable<IPackaging> {
        packaging.id = undefined;
        return this.http.post(this.baseUrl, packaging, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(packaging: IPackaging, options: RequestOptions): Observable<IPackaging> {
        const url = `${this.baseUrl}/${packaging.id}`;
        return this.http.put(url, packaging, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<IPackaging[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <IPackaging[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<IPackaging> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <IPackaging>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}