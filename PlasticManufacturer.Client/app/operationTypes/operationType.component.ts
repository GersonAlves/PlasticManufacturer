import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IOperationType } from './operationType.model'
import { OperationTypeService } from './operationType.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/operationTypes/operationType.component.html'
})

export class OperationTypeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    operationTypeForm: FormGroup;
    operationType: IOperationType;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'OperationType';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private operationTypeService:OperationTypeService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.operationTypeForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the operationType Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getOperationType(id);
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
        Observable.merge(this.operationTypeForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.operationTypeForm);
        });
    }

    getOperationType(id: number): void {
        if (id !== 0) {
            this.operationTypeService.getById(id)
                .subscribe(
                (operationType: IOperationType) => this.onCorrierRetrieved(operationType),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(operationType: IOperationType): void {
        if (this.operationTypeForm) {
            this.operationTypeForm.reset();
        }
        this.operationType = operationType;

        if (this.operationType.id === 0) {
            this.pageTitle = 'Add OperationType';
        } else {
            this.pageTitle = `Edit OperationType  : ${this.operationType.name}`;
        }

        // Update the data on the form
        this.operationTypeForm.patchValue({
            id: this.operationType.id,
            name: this.operationType.name,
            description: this.operationType.description
        });
    }

    save(): void {
        if (this.operationTypeForm.dirty && this.operationTypeForm.valid) {
            // Copy the form values over the operationType object values
            let c = (<any>Object).assign({}, this.operationType, this.operationTypeForm.value);

            this.operationTypeService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.operationTypeForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.operationTypeForm.reset();
        this.router.navigate(['/operationTypes']);
    }


    delete(): void {
        if (this.operationType.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.operationType.name}?`)) {
                this.operationTypeService.delete(this.operationType.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/operationTypes'])
    }


}