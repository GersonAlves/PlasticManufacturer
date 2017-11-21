import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICdefault } from './cdefault.model'
import { CdefaultService } from './cdefault.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/cdefaults/cdefault.component.html'
})

export class CdefaultComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    cdefaultForm: FormGroup;
    cdefault: ICdefault;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'cdefault';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private cdefaultService: CdefaultService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'cdefault name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.cdefaultForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the cdefault Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getcdefault(id);
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
        Observable.merge(this.cdefaultForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.cdefaultForm);
        });
    }

    getcdefault(id: number): void {
        if (id !== 0) {
            this.cdefaultService.getById(id)
                .subscribe(
                (cdefault: ICdefault) => this.onCorrierRetrieved(cdefault),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(cdefault: ICdefault): void {
        if (this.cdefaultForm) {
            this.cdefaultForm.reset();
        }
        this.cdefault = cdefault;

        if (this.cdefault.id === 0) {
            this.pageTitle = 'Add cdefault';
        } else {
            this.pageTitle = `Edit cdefault  : ${this.cdefault.name}`;
        }

        // Update the data on the form
        this.cdefaultForm.patchValue({
            id: this.cdefault.id,
            name: this.cdefault.name,
            description: this.cdefault.description
        });
    }

    save(): void {
        if (this.cdefaultForm.dirty && this.cdefaultForm.valid) {
            // Copy the form values over the cdefault object values
            let c = (<any>Object).assign({}, this.cdefault, this.cdefaultForm.value);

            this.cdefaultService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.cdefaultForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.cdefaultForm.reset();
        this.router.navigate(['/cdefaults']);
    }


    delete(): void {
        if (this.cdefault.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.cdefault.name}?`)) {
                this.cdefaultService.delete(this.cdefault.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/cdefaults'])
    }


}