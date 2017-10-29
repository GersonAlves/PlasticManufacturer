import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICarrier } from './carrier.model'
import { CarrierService } from './carrier.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/carriers/carrier.component.html'
})

export class CarrierComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    carrierForm: FormGroup;
    carrier: ICarrier;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Carrier';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private carrierService: CarrierService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.carrierForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the carrier Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCarrier(id);
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
        Observable.merge(this.carrierForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.carrierForm);
        });
    }

    getCarrier(id: number): void {
        if (id !== 0) {
            this.carrierService.getById(id)
                .subscribe(
                (carrier: ICarrier) => this.onCorrierRetrieved(carrier),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(carrier: ICarrier): void {
        if (this.carrierForm) {
            this.carrierForm.reset();
        }
        this.carrier = carrier;

        if (this.carrier.id === 0) {
            this.pageTitle = 'Add Carrier';
        } else {
            this.pageTitle = `Edit Carrier  : ${this.carrier.name}`;
        }

        // Update the data on the form
        this.carrierForm.patchValue({
            id: this.carrier.id,
            name: this.carrier.name,
            description: this.carrier.description
        });
    }

    save(): void {
        if (this.carrierForm.dirty && this.carrierForm.valid) {
            // Copy the form values over the carrier object values
            let c = (<any>Object).assign({}, this.carrier, this.carrierForm.value);

            this.carrierService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.carrierForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {    
        // Reset the form to clear the flags
        this.carrierForm.reset();
        this.router.navigate(['/carriers']);
    }


    delete(): void {
        if (this.carrier.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.carrier.name}?`)) {
                this.carrierService.delete(this.carrier.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/carriers'])
    }


}