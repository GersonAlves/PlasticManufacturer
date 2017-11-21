import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IFormula } from './formula.model'
import { FormulaService } from './formula.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/formulas/formula.component.html'
})

export class FormulaComponent implements OnInit, AfterViewInit, OnDestroy {
    formula: any;
    formulaForm: FormGroup;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    FormulaForm: FormGroup;
    Formula: IFormula;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'formula';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private formulaService: FormulaService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'carreir name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.formulaForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the formula Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getformula(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.formulaForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.formulaForm);
        });
    }

    getformula(id: number): void {
        if (id !== 0) {
            this.formulaService.getById(id)
                .subscribe(
                (formula: IFormula) => this.onCorrierRetrieved(formula),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(formula: IFormula): void {
        if (this.formulaForm) {
            this.formulaForm.reset();
        }
        this.formula = formula;

        if (this.formula.id === 0) {
            this.pageTitle = 'Add formula';
        } else {
            this.pageTitle = `Edit formula  : ${this.formula.name}`;
        }

        // Update the data on the form
        this.formulaForm.patchValue({
            id: this.formula.id,
            name: this.formula.name,
            description: this.formula.description
        });
    }

    save(): void {
        if (this.formulaForm.dirty && this.formulaForm.valid) {
            // Copy the form values over the formula object values
            let c = (<any>Object).assign({}, this.formula, this.formulaForm.value);

            this.formulaService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.formulaForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.formulaForm.reset();
        this.router.navigate(['/formulas']);
    }


    delete(): void {
        if (this.formula.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.formula.name}?`)) {
                this.formulaService.delete(this.formula.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/formulas'])
    }


}