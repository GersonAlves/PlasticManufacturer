import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IPackage } from './package.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class PackageService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/packages';
    private baseUrl = 'http://localhost:55751/api/packages';

    constructor(private http: Http) { }

    save(packages: IPackage): Observable<IPackage> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (packages.id === 0) {
            return this.create(packages, options);
        }
        return this.update(packages, options);
    }

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(packages: IPackage, options: RequestOptions): Observable<IPackage> {
        packages.id = undefined;
        return this.http.post(this.baseUrl, packages, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private update(packages: IPackage, options: RequestOptions): Observable<IPackage> {
        const url = `${this.baseUrl}/${packages.id}`;
        return this.http.put(url, packages, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAll(): Observable<IPackage[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <IPackage[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<IPackage> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <IPackage>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}