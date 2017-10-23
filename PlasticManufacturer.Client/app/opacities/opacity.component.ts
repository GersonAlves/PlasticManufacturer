import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IOpacity } from './opacity.model'
import {OpacityService  } from './opacity.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/opacities/opacity.component.html'
})

export class OpacityComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    opacityForm: FormGroup;
    opacity: IOpacity;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Opacity';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private opacityService: OpacityService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.opacityForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the opacity Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getOpacity(id);
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
        Observable.merge(this.opacityForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.opacityForm);
        });
    }

    getOpacity(id: number): void {
        if (id !== 0) {
            this.opacityService.getById(id)
                .subscribe(
                (opacity: IOpacity) => this.onCorrierRetrieved(opacity),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(opacity: IOpacity): void {
        if (this.opacityForm) {
            this.opacityForm.reset();
        }
        this.opacity = opacity;

        if (this.opacity.id === 0) {
            this.pageTitle = 'Add Opacity';
        } else {
            this.pageTitle = `Edit Opacity  : ${this.opacity.name}`;
        }

        // Update the data on the form
        this.opacityForm.patchValue({
            id: this.opacity.id,
            name: this.opacity.name,
            description: this.opacity.description
        });
    }

    save(): void {
        if (this.opacityForm.dirty && this.opacityForm.valid) {
            // Copy the form values over the opacity object values
            let c = Object.assign({}, this.opacity, this.opacityForm.value);

            console.log(c);

            this.opacityService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.opacityForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.opacityForm.reset();
        this.router.navigate(['/opacities']);
    }


    delete(): void {
        if (this.opacity.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.opacity.name}?`)) {
                this.opacityService.delete(this.opacity.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/opacities'])
    }


}