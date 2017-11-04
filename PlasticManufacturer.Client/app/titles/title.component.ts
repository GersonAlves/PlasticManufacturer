import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ITitle } from './title.model'
import { TitleService } from './title.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/titles/title.component.html'
})

export class TitleComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    titleForm: FormGroup;
    title: ITitle;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Title';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private titleService: TitleService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Title name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.titleForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the title Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.gettitle(id);
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
        Observable.merge(this.titleForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.titleForm);
        });
    }

    gettitle(id: number): void {
        if (id !== 0) {
            this.titleService.getById(id)
                .subscribe(
                (title: ITitle) => this.onCorrierRetrieved(title),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(title: ITitle): void {
        if (this.titleForm) {
            this.titleForm.reset();
        }
        this.title = title;

        if (this.title.id === 0) {
            this.pageTitle = 'Add title';
        } else {
            this.pageTitle = `Edit title  : ${this.title.name}`;
        }

        // Update the data on the form
        this.titleForm.patchValue({
            id: this.title.id,
            name: this.title.name,
            description: this.title.description
        });
    }

    save(): void {
        if (this.titleForm.dirty && this.titleForm.valid) {
            // Copy the form values over the title object values
            let c = (<any>Object).assign({}, this.title, this.titleForm.value);

            this.titleService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.titleForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.titleForm.reset();
        this.router.navigate(['/titles']);
    }


    delete(): void {
        if (this.title.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.title.name}?`)) {
                this.titleService.delete(this.title.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/titles'])
    }


}