import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { ICategory } from './category.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class CategoryService {
    private api = 'categories';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(category: ICategory): Observable<ICategory> {

        if (category.id === 0) {
            return this.create(category);
        }
        return this.update(category);
    }

    delete(id: number): Observable<Response> {

        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(category: ICategory): Observable<ICategory> {
        category.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), category, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(category: ICategory): Observable<ICategory> {
        return this.http.put(this.httpUtil.url(this.api + '/' + category.id), category, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<ICategory[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <ICategory[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<ICategory> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <ICategory>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}