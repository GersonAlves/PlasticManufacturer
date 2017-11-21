import { Component, OnInit } from '@angular/core';
import { IFormula } from './formula.model';
import { FormulaService } from './formula.service';

@Component({
    templateUrl: 'app/formulas/formula-list.component.html',
})

export class FormulaListComponent implements OnInit {
    pageTitle: string = 'formula List';
    errorMessage: string;

    formulas: IFormula[];

    constructor(private formulaService: FormulaService) { }

    ngOnInit(): void {
        this.formulaService.getAll()
            .subscribe(formulas => this.formulas = formulas,
            error => this.errorMessage = <any>error);
    }

}