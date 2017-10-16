import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICategory } from './category.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class CategoryService {

    constructor(private http: Http) { }

    getAll() : Observable<ICategory[]> {
        return this.http.get("http://localhost:55751/api/Categories").map((response: Response) => {
            return <ICategory[]>response.json();
        }).catch(this.handleError);
    }

    //getById(id: number): Observable<ICategory> {
    //    return this.http.get("http://localhost:55751/api/Categories/" + id).map((response: Response) => {
    //        return <ICategory>response.json();
    //    }).catch(this.handleError);
    //}

    save(category): Observable<ICategory> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("http://localhost:55751/api/Categories", JSON.stringify(category),
            options).map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

}