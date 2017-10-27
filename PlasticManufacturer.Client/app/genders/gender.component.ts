import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IGender } from './gender.model'
import { GenderService } from './gender.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/genders/gender.component.html'
})

export class GenderComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    genderForm: FormGroup;
    gender: IGender;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'gender';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private genderService: GenderService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.genderForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the gender Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getgender(id);
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
        Observable.merge(this.genderForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.genderForm);
        });
    }

    getgender(id: number): void {
        if (id !== 0) {
            this.genderService.getById(id)
                .subscribe(
                (gender: IGender) => this.onCorrierRetrieved(gender),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(gender: IGender): void {
        if (this.genderForm) {
            this.genderForm.reset();
        }
        this.gender = gender;

        if (this.gender.id === 0) {
            this.pageTitle = 'Add gender';
        } else {
            this.pageTitle = `Edit gender  : ${this.gender.name}`;
        }

        // Update the data on the form
        this.genderForm.patchValue({
            id: this.gender.id,
            name: this.gender.name,
            description: this.gender.description
        });
    }

    save(): void {
        if (this.genderForm.dirty && this.genderForm.valid) {
            // Copy the form values over the gender object values
            let c = (<any>Object).assign({}, this.gender, this.genderForm.value);

            console.log(c);

            this.genderService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.genderForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.genderForm.reset();
        this.router.navigate(['/genders']);
    }


    delete(): void {
        if (this.gender.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.gender.name}?`)) {
                this.genderService.delete(this.gender.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/genders'])
    }


}