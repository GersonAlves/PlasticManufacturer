import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICategory } from './category.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class CategoryService {
    //private baseUrl = 'http://hml.api.newfdplastics.com/api/categories';
    private baseUrl = 'http://test.api.newfdplastics.com/api/categories';
    
    constructor(private http: Http) { }

    save(category: ICategory): Observable<ICategory> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (category.id === 0) {
            return this.create(category, options);
        }
        return this.update(category, options);
    }   

    delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    private create(category: ICategory, options: RequestOptions): Observable<ICategory> {
        category.id = undefined;
        return this.http.post(this.baseUrl, category, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
    
    private update(category: ICategory, options: RequestOptions): Observable<ICategory> {
        const url = `${this.baseUrl}/${category.id}`;
        return this.http.put(url, category, options)
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }
   
    getAll(): Observable<ICategory[]> {
        return this.http.get(this.baseUrl).map((response: Response) => {
            return <ICategory[]>response.json();
        }).catch(this.handleError);
    }

    getById(id: number): Observable<ICategory> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map((response: Response) => {
            return <ICategory>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}