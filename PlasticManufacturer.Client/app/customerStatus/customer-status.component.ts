import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomerStatus } from './customer-status.model'
import { CustomerStatusService } from './customer-status.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/customerStatus/customer-status.component.html'
})

export class CustomerStatusComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerStatusForm: FormGroup;
    customerStatus: ICustomerStatus;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Customer Status';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private customerStatusService: CustomerStatusService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.customerStatusForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the Customer Status Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCustomerStatus(id);
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
        Observable.merge(this.customerStatusForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerStatusForm);
        });
    }

    getCustomerStatus(id: number): void {
        if (id !== 0) {
            this.customerStatusService.getById(id)
                .subscribe(
                (customerStatus: ICustomerStatus) => this.onCorrierRetrieved(customerStatus),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(customerStatus: ICustomerStatus): void {
        if (this.customerStatusForm) {
            this.customerStatusForm.reset();
        }
        this.customerStatus = customerStatus;

        if (this.customerStatus.id === 0) {
            this.pageTitle = 'Add Customer Status';
        } else {
            this.pageTitle = `Edit Customer Status  : ${this.customerStatus.name}`;
        }

        // Update the data on the form
        this.customerStatusForm.patchValue({
            id: this.customerStatus.id,
            name: this.customerStatus.name,
            description: this.customerStatus.description
        });
    }

    save(): void {
        if (this.customerStatusForm.dirty && this.customerStatusForm.valid) {
            // Copy the form values over the Customer Status object values
            let c = (<any>Object).assign({}, this.customerStatus, this.customerStatusForm.value);

            this.customerStatusService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerStatusForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customerStatusForm.reset();
        this.router.navigate(['/customerStatus']);
    }


    delete(): void {
        if (this.customerStatus.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customerStatus.name}?`)) {
                this.customerStatusService.delete(this.customerStatus.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/customerStatus'])
    }


}