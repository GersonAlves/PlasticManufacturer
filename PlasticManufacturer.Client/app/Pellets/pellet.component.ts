import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IPellet } from './pellet.model'
import { PelletService } from './pellet.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/pellets/pellet.component.html'
})

export class PelletComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pelletForm: FormGroup;
    pellet: IPellet;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Pellet';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private pelletService: PelletService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Pellet name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.pelletForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the pellet Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getpellet(id);
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
        Observable.merge(this.pelletForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.pelletForm);
        });
    }

    getpellet(id: number): void {
        if (id !== 0) {
            this.pelletService.getById(id)
                .subscribe(
                (pellet: IPellet) => this.onCorrierRetrieved(pellet),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(pellet: IPellet): void {
        if (this.pelletForm) {
            this.pelletForm.reset();
        }
        this.pellet = pellet;

        if (this.pellet.id === 0) {
            this.pageTitle = 'Add pellet';
        } else {
            this.pageTitle = `Edit pellet  : ${this.pellet.name}`;
        }

        // Update the data on the form
        this.pelletForm.patchValue({
            id: this.pellet.id,
            name: this.pellet.name,
            description: this.pellet.description
        });
    }

    save(): void {
        if (this.pelletForm.dirty && this.pelletForm.valid) {
            // Copy the form values over the pellet object values
            let c = (<any>Object).assign({}, this.pellet, this.pelletForm.value);

            this.pelletService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.pelletForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.pelletForm.reset();
        this.router.navigate(['/pellets']);
    }


    delete(): void {
        if (this.pellet.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.pellet.name}?`)) {
                this.pelletService.delete(this.pellet.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/pellets'])
    }


}