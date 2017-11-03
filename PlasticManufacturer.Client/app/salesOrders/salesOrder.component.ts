import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ISalesOrder } from './salesOrder.model'
import { SalesOrderService } from './salesOrder.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/salesOrders/salesOrder.component.html'
})

export class SalesOrderComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    salesOrderForm: FormGroup;
    salesOrder: ISalesOrder;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'SalesOrder';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private salesOrderService: SalesOrderService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'saleesOrder name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.salesOrderForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the salesOrder Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getSalesOrder(id);
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
        Observable.merge(this.salesOrderForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.salesOrderForm);
        });
    }

    getSalesOrder(id: number): void {
        if (id !== 0) {
            this.salesOrderService.getById(id)
                .subscribe(
                (salesOrder: ISalesOrder) => this.onCorrierRetrieved(salesOrder),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(salesOrder: ISalesOrder): void {
        if (this.salesOrderForm) {
            this.salesOrderForm.reset();
        }
        this.salesOrder = salesOrder;

        if (this.salesOrder.id === 0) {
            this.pageTitle = 'Add SalesOrder';
        } else {
            this.pageTitle = `Edit SalesOrder  : ${this.salesOrder.name}`;
        }

        // Update the data on the form
        this.salesOrderForm.patchValue({
            id: this.salesOrder.id,
            name: this.salesOrder.name,
            description: this.salesOrder.description
        });
    }

    save(): void {
        if (this.salesOrderForm.dirty && this.salesOrderForm.valid) {
            // Copy the form values over the salesOrder object values
            let c = (<any>Object).assign({}, this.salesOrder, this.salesOrderForm.value);

            console.log(c);

            this.salesOrderService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.salesOrderForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.salesOrderForm.reset();
        this.router.navigate(['/salesOrders']);
    }


    delete(): void {
        if (this.salesOrder.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.salesOrder.name}?`)) {
                this.salesOrderService.delete(this.salesOrder.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/salesOrders'])
    }


}