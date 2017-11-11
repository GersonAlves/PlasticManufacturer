﻿import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomerContacted } from './customerContacted.model'
import { CustomerContactedService } from './customerContacted.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/customerContacteds/customerContacted.component.html'
})

export class CustomerContactedComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerContactedForm: FormGroup;
    customerContacted: ICustomerContacted;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Customer Contacted';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private customerContactedService: CustomerContactedService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.customerContactedForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the customerContacted Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getcustomerContacted(id);
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
        Observable.merge(this.customerContactedForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerContactedForm);
        });
    }

    getcustomerContacted(id: number): void {
        if (id !== 0) {
            this.customerContactedService.getById(id)
                .subscribe(
                (customerContacted: ICustomerContacted) => this.onCorrierRetrieved(customerContacted),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(customerContacted: ICustomerContacted): void {
        if (this.customerContactedForm) {
            this.customerContactedForm.reset();
        }
        this.customerContacted = customerContacted;

        if (this.customerContacted.id === 0) {
            this.pageTitle = 'Add Customer Contacted ';
        } else {
            this.pageTitle = `Edit Customer Contacted  : ${this.customerContacted.name}`;
        }

        // Update the data on the form
        this.customerContactedForm.patchValue({
            id: this.customerContacted.id,
            name: this.customerContacted.name,
            description: this.customerContacted.description
        });
    }

    save(): void {
        if (this.customerContactedForm.dirty && this.customerContactedForm.valid) {
            // Copy the form values over the customerContacted object values
            let c = (<any>Object).assign({}, this.customerContacted, this.customerContactedForm.value);

            this.customerContactedService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerContactedForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customerContactedForm.reset();
        this.router.navigate(['/customerContacteds']);
    }


    delete(): void {
        if (this.customerContacted.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customerContacted.name}?`)) {
                this.customerContactedService.delete(this.customerContacted.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }
    cancel() {
        this.router.navigate(['/customerContacteds'])
    }


}