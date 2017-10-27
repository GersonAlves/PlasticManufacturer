import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICity } from './city.model'
import { CityService } from './city.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/cities/city.component.html'
})

export class CityComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    cityForm: FormGroup;
    city: ICity;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'city';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private cityService: CityService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.cityForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the city Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getcity(id);
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
        Observable.merge(this.cityForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.cityForm);
        });
    }

    getcity(id: number): void {
        if (id !== 0) {
            this.cityService.getById(id)
                .subscribe(
                (city: ICity) => this.onCorrierRetrieved(city),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(city: ICity): void {
        if (this.cityForm) {
            this.cityForm.reset();
        }
        this.city = city;

        if (this.city.id === 0) {
            this.pageTitle = 'Add city';
        } else {
            this.pageTitle = `Edit city  : ${this.city.name}`;
        }

        // Update the data on the form
        this.cityForm.patchValue({
            id: this.city.id,
            name: this.city.name,
            description: this.city.description
        });
    }

    save(): void {
        if (this.cityForm.dirty && this.cityForm.valid) {
            // Copy the form values over the city object values
            let c = (<any>Object).assign({}, this.city, this.cityForm.value);

            console.log(c);

            this.cityService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.cityForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.cityForm.reset();
        this.router.navigate(['/cities']);
    }


    delete(): void {
        if (this.city.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.city.name}?`)) {
                this.cityService.delete(this.city.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/cities'])
    }


}