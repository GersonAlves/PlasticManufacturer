import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IMaritalStatus } from './maritalStatus.model'
import { MaritalStatusService } from './maritalStatus.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/maritalStatus/maritalStatus.component.html'
})

export class MaritalStatusComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    maritalStatusForm: FormGroup;
    maritalStatus: IMaritalStatus;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Marital Status';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private maritalStatusService: MaritalStatusService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'marital Status name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.maritalStatusForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the maritalStatu Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getMaritalStatus(id);
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
        Observable.merge(this.maritalStatusForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.maritalStatusForm);
        });
    }

    getMaritalStatus(id: number): void {
        if (id !== 0) {
            this.maritalStatusService.getById(id)
                .subscribe(
                (maritalStatus: IMaritalStatus) => this.onCorrierRetrieved(maritalStatus),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }

    onCorrierRetrieved(maritalStatus: IMaritalStatus): void {
        if (this.maritalStatusForm) {
            this.maritalStatusForm.reset();
        }
        this.maritalStatus = maritalStatus;

        if (this.maritalStatus.id === 0) {
            this.pageTitle = 'Add Marital Status';
        } else {
            this.pageTitle = `Edit Marital Status  : ${this.maritalStatus.name}`;
        }

        // Update the data on the form
        this.maritalStatusForm.patchValue({
            id: this.maritalStatus.id,
            name: this.maritalStatus.name,
            description: this.maritalStatus.description
        });
    }

    save(): void {
        if (this.maritalStatusForm.dirty && this.maritalStatusForm.valid) {
            // Copy the form values over the maritalStatu object values
            let c = (<any>Object).assign({}, this.maritalStatus, this.maritalStatusForm.value);

            this.maritalStatusService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.maritalStatusForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {    
        // Reset the form to clear the flags
        this.maritalStatusForm.reset();
        this.router.navigate(['/maritalStatus']);
    }

    delete(): void {
        if (this.maritalStatus.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.maritalStatus.name}?`)) {
                this.maritalStatusService.delete(this.maritalStatus.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/maritalStatus'])
    }


}