import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IMarkup } from './markup.model'
import { MarkupService } from './markup.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/markups/markup.component.html'
})

export class MarkupComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    markupForm: FormGroup;
    markup: IMarkup;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'markup';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private markupService: MarkupService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Markup name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.markupForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the markup Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getmarkup(id);
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
        Observable.merge(this.markupForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.markupForm);
        });
    }

    getmarkup(id: number): void {
        if (id !== 0) {
            this.markupService.getById(id)
                .subscribe(
                (markup: IMarkup) => this.onCorrierRetrieved(markup),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(markup: IMarkup): void {
        if (this.markupForm) {
            this.markupForm.reset();
        }
        this.markup = markup;

        if (this.markup.id === 0) {
            this.pageTitle = 'Add markup';
        } else {
            this.pageTitle = `Edit markup  : ${this.markup.name}`;
        }

        // Update the data on the form
        this.markupForm.patchValue({
            id: this.markup.id,
            name: this.markup.name,
            description: this.markup.description
        });
    }

    save(): void {
        if (this.markupForm.dirty && this.markupForm.valid) {
            // Copy the form values over the markup object values
            let c = (<any>Object).assign({}, this.markup, this.markupForm.value);

            this.markupService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.markupForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.markupForm.reset();
        this.router.navigate(['/markups']);
    }


    delete(): void {
        if (this.markup.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.markup.name}?`)) {
                this.markupService.delete(this.markup.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/markups'])
    }


}