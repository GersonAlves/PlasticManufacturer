import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IShippingMethod } from './shippingmethod.model'
import { ShippingMethodService } from './shippingMethod.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/shippingMethods/shippingMethod.component.html'
})

export class ShippingMethodComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    shippingMethodForm: FormGroup;
    shippingMethod: IShippingMethod;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'ShippingMethod';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private shippingMethodService: ShippingMethodService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'ShippingMethod name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.shippingMethodForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the shippingMethod Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getshippingMethod(id);
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
        Observable.merge(this.shippingMethodForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.shippingMethodForm);
        });
    }

    getshippingMethod(id: number): void {
        if (id !== 0) {
            this.shippingMethodService.getById(id)
                .subscribe(
                (shippingMethod: IShippingMethod) => this.onCorrierRetrieved(shippingMethod),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(shippingMethod: IShippingMethod): void {
        if (this.shippingMethodForm) {
            this.shippingMethodForm.reset();
        }
        this.shippingMethod = shippingMethod;

        if (this.shippingMethod.id === 0) {
            this.pageTitle = 'Add shippingMethod';
        } else {
            this.pageTitle = `Edit shipping Method  : ${this.shippingMethod.name}`;
        }

        // Update the data on the form
        this.shippingMethodForm.patchValue({
            id: this.shippingMethod.id,
            name: this.shippingMethod.name,
        });
    }

    save(): void {
        if (this.shippingMethodForm.dirty && this.shippingMethodForm.valid) {
            // Copy the form values over the shippingMethod object values
            let c = (<any>Object).assign({}, this.shippingMethod, this.shippingMethodForm.value);

            this.shippingMethodService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.shippingMethodForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.shippingMethodForm.reset();
        this.router.navigate(['/shippingMethods']);
    }


    delete(): void {
        if (this.shippingMethod.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.shippingMethod.name}?`)) {
                this.shippingMethodService.delete(this.shippingMethod.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/shippingMethods'])
    }


}