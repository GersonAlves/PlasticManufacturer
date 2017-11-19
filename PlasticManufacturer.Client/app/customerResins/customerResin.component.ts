import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomerResin, CustomerResinService } from './index'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/customerResins/customerResin.component.html'
})

export class CustomerResinComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerResinForm: FormGroup;
    customerResin: ICustomerResin;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Customer Resin';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private customerResinService: CustomerResinService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Customer resin name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.customerResinForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the customerResin Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getcustomerResin(id);
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
        Observable.merge(this.customerResinForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerResinForm);
        });
    }

    getcustomerResin(id: number): void {
        if (id !== 0) {
            this.customerResinService.getById(id)
                .subscribe(
                (customerResin: ICustomerResin) => this.onCorrierRetrieved(customerResin),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(customerResin: ICustomerResin): void {
        if (this.customerResinForm) {
            this.customerResinForm.reset();
        }
        this.customerResin = customerResin;

        if (this.customerResin.id === 0) {
            this.pageTitle = 'Add Customer Resin';
        } else {
            this.pageTitle = `Edit Customer Resin  : ${this.customerResin.name}`;
        }

        // Update the data on the form
        this.customerResinForm.patchValue({
            id: this.customerResin.id,
            name: this.customerResin.name,
            description: this.customerResin.description
        });
    }

    save(): void {
        if (this.customerResinForm.dirty && this.customerResinForm.valid) {
            // Copy the form values over the customerResin object values
            let c = (<any>Object).assign({}, this.customerResin, this.customerResinForm.value);

            this.customerResinService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerResinForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customerResinForm.reset();
        this.router.navigate(['/customerResins']);
    }


    delete(): void {
        if (this.customerResin.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customerResin.name}?`)) {
                this.customerResinService.delete(this.customerResin.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/customerResins'])
    }


}