import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IFormula } from './formula.model'
import { Http, Response } from '@angular/http'
import { HttpUtilService } from '../shared/http-util.service'

@Injectable()
export class FormulaService {
    private api = 'formulas';

    constructor(private http: Http, private httpUtil: HttpUtilService) { }

    save(formula: IFormula): Observable<IFormula> {

        if (formula.id === 0) {
            return this.create(formula);
        }
        return this.update(formula);
    }

    delete(id: number): Observable<Response> {

        return this.http.delete(this.httpUtil.url(this.api + '/' + id), this.httpUtil.headers())
            .catch(this.httpUtil.processarErros);
    }

    private create(formula: IFormula): Observable<IFormula> {
        formula.id = undefined;
        return this.http.post(this.httpUtil.url(this.api), formula, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    private update(formula: IFormula): Observable<IFormula> {
        return this.http.put(this.httpUtil.url(this.api + '/' + formula.id), formula, this.httpUtil.headers())
            .map((response: Response) => {
                return response.json();
            }).catch(this.httpUtil.processarErros);
    }

    getAll(): Observable<IFormula[]> {
        return this.http.get(this.httpUtil.url(this.api)).map((response: Response) => {
            return <IFormula[]>response.json();
        }).catch(this.httpUtil.processarErros);
    }

    getById(id: number): Observable<IFormula> {
        return this.http.get(this.httpUtil.url(this.api + '/' + id)).map((response: Response) => {
            return <IFormula>response.json();
        }).catch(this.httpUtil.processarErros);
    }
}