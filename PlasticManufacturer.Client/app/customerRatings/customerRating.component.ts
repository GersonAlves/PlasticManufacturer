import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomerRating } from './customerRating.model'
import { CustomerRatingService } from './customerRating.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/customerRatings/customerRating.component.html'
})

export class CustomerRatingComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerRatingForm: FormGroup;
    customerRating: ICustomerRating;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'CustomerRating';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private customerRatingService: CustomerRatingService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.customerRatingForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the customerRating Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCustomerRating(id);
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
        Observable.merge(this.customerRatingForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerRatingForm);
        });
    }

    getCustomerRating(id: number): void {
        if (id !== 0) {
            this.customerRatingService.getById(id)
                .subscribe(
                (customerRating: ICustomerRating) => this.onCorrierRetrieved(customerRating),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(customerRating: ICustomerRating): void {
        if (this.customerRatingForm) {
            this.customerRatingForm.reset();
        }
        this.customerRating = customerRating;

        if (this.customerRating.id === 0) {
            this.pageTitle = 'Add CustomerRating';
        } else {
            this.pageTitle = `Edit CustomerRating  : ${this.customerRating.name}`;
        }

        // Update the data on the form
        this.customerRatingForm.patchValue({
            id: this.customerRating.id,
            name: this.customerRating.name,
            description: this.customerRating.description
        });
    }

    save(): void {
        if (this.customerRatingForm.dirty && this.customerRatingForm.valid) {
            // Copy the form values over the customerRating object values
            let c = (<any>Object).assign({}, this.customerRating, this.customerRatingForm.value);

            console.log(c);

            this.customerRatingService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerRatingForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {    
        // Reset the form to clear the flags
        this.customerRatingForm.reset();
        this.router.navigate(['/customerRatings']);
    }


    delete(): void {
        if (this.customerRating.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customerRating.name}?`)) {
                this.customerRatingService.delete(this.customerRating.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/customerRatings'])
    }


}