import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomer } from './customer.model'
import { CustomerService } from './customer.service'

import { CustomerStatusService } from '../customerStatus/customer-status.service'
import { ICustomerStatus } from '../customerStatus/customer-status.model'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/customers/customer.component.html'
})

export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerForm: FormGroup;
    customer: ICustomer;
    customerStatus: ICustomerStatus[];
    customerSt: ICustomerStatus;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'customer';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private customerService: CustomerService, private formBuilder: FormBuilder, private route: ActivatedRoute, private customerStatusService: CustomerStatusService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'customer name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.customerForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            lastName: '',
            status: this.customerSt,
            prospect: 0,
            lead: 0
            
        });

        this.loadCustomerStatus();

        // Read the customer Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getcustomer(id);
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
        Observable.merge(this.customerForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerForm);
        });
    }

    getcustomer(id: number): void {
        if (id !== 0) {
            this.customerService.getById(id)
                .subscribe(
                (customer: ICustomer) => this.onCustomerRetrieved(customer),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }

    loadCustomerStatus(): void {
        this.customerStatusService.getAll()
            .subscribe(customerStatus => this.customerStatus = customerStatus,
            error => this.errorMessage = <any>error);

        console.log('customerStatus');
        console.log(this.customerStatus);
    }


    onCustomerRetrieved(customer: ICustomer): void {
        if (this.customerForm) {
            this.customerForm.reset();
        }
        this.customer = customer;

        if (this.customer.id === 0) {
            this.pageTitle = 'Add customer';
        } else {
            this.pageTitle = `Edit customer  : ${this.customer.name}`;
        }

        // Update the data on the form
        this.customerForm.patchValue({
            id: this.customer.id,
            name: this.customer.name,
            lastName: this.customer.lastName,
            //status: this.customer.status.id,
            prospect: this.customer.prospect,
            lead: this.customer.lead
        });
    }

    save(): void {

        console.log( this.customerForm.value);
        //if (this.customerForm.dirty && this.customerForm.valid) {
        //    // Copy the form values over the customer object values
        //    let c = (<any>Object).assign({}, this.customer, this.customerForm.value);

        //    this.customerService.save(c)
        //        .subscribe(
        //        () => this.onSaveComplete(),
        //        (error: any) => this.errorMessage = <any>error
        //        );
        //} else if (!this.customerForm.dirty) {
        //    this.onSaveComplete();
        //}
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customerForm.reset();
        this.router.navigate(['/customers']);
    }


    delete(): void {
        if (this.customer.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customer.name}?`)) {
                this.customerService.delete(this.customer.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    cancel() {
        this.router.navigate(['/customers'])
    }


}