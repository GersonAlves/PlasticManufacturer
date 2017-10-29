import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomerDefault } from './customerDefault.model'
import { CustomerDefaultService } from './customerDefault.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/customerDefaults/customerDefault.component.html'
})

export class CustomerDefaultComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerDefaultForm: FormGroup;
    customerDefault: ICustomerDefault;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'customerDefault';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private customerDefaultService: CustomerDefaultService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.customerDefaultForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the customerDefault Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCustomerDefault(id);
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
        Observable.merge(this.customerDefaultForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerDefaultForm);
        });
    }

    getCustomerDefault(id: number): void {
        if (id !== 0) {
            this.customerDefaultService.getById(id)
                .subscribe(
                (customerDefault: ICustomerDefault) => this.onCorrierRetrieved(customerDefault),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(customerDefault: ICustomerDefault): void {
        if (this.customerDefaultForm) {
            this.customerDefaultForm.reset();
        }
        this.customerDefault = customerDefault;

        if (this.customerDefault.id === 0) {
            this.pageTitle = 'Add CustomerDefault';
        } else {
            this.pageTitle = `Edit CustomerDefault  : ${this.customerDefault.name}`;
        }

        // Update the data on the form
        this.customerDefaultForm.patchValue({
            id: this.customerDefault.id,
            name: this.customerDefault.name,
            description: this.customerDefault.description
        });
    }

    save(): void {
        if (this.customerDefaultForm.dirty && this.customerDefaultForm.valid) {
            // Copy the form values over the customerDefault object values
            let c = (<any>Object).assign({}, this.customerDefault, this.customerDefaultForm.value);

            this.customerDefaultService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerDefaultForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {    
        // Reset the form to clear the flags
        this.customerDefaultForm.reset();
        this.router.navigate(['/customerDefaults']);
    }


    delete(): void {
        if (this.customerDefault.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customerDefault.name}?`)) {
                this.customerDefaultService.delete(this.customerDefault.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/customerDefaults'])
    }


}