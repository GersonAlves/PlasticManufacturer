import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IFreight } from './freight.model'
import { FreightService } from './freight.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/freights/freight.component.html'
})

export class FreightComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    freightForm: FormGroup;
    freight: IFreight;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Freight';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private freightService: FreightService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'freight name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.freightForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the freight Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getfreight(id);
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
        Observable.merge(this.freightForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.freightForm);
        });
    }

    getfreight(id: number): void {
        if (id !== 0) {
            this.freightService.getById(id)
                .subscribe(
                (freight: IFreight) => this.onCorrierRetrieved(freight),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(freight: IFreight): void {
        if (this.freightForm) {
            this.freightForm.reset();
        }
        this.freight = freight;

        if (this.freight.id === 0) {
            this.pageTitle = 'Add Freight';
        } else {
            this.pageTitle = `Edit Freight  : ${this.freight.name}`;
        }

        // Update the data on the form
        this.freightForm.patchValue({
            id: this.freight.id,
            name: this.freight.name,
            description: this.freight.description
        });
    }

    save(): void {
        if (this.freightForm.dirty && this.freightForm.valid) {
            // Copy the form values over the freight object values
            let c = (<any>Object).assign({}, this.freight, this.freightForm.value);

            this.freightService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.freightForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.freightForm.reset();
        this.router.navigate(['/freights']);
    }


    delete(): void {
        if (this.freight.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.freight.name}?`)) {
                this.freightService.delete(this.freight.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/freights'])
    }


}