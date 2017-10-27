import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IMaritalStatu } from './maritalStatu.model'
import { MaritalStatuService } from './maritalStatu.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/maritalStatus/maritalStatu.component.html'
})

export class MaritalStatuComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    maritalStatuForm: FormGroup;
    maritalStatu: IMaritalStatu;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'MaritalStatu';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private maritalStatuService: MaritalStatuService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'maritalStatu name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.maritalStatuForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the maritalStatu Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getMaritalStatu(id);
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
        Observable.merge(this.maritalStatuForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.maritalStatuForm);
        });
    }

    getMaritalStatu(id: number): void {
        if (id !== 0) {
            this.maritalStatuService.getById(id)
                .subscribe(
                (maritalStatu: IMaritalStatu) => this.onCorrierRetrieved(maritalStatu),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(maritalStatu: IMaritalStatu): void {
        if (this.maritalStatuForm) {
            this.maritalStatuForm.reset();
        }
        this.maritalStatu = maritalStatu;

        if (this.maritalStatu.id === 0) {
            this.pageTitle = 'Add MaritalStatu';
        } else {
            this.pageTitle = `Edit MaritalStatu  : ${this.maritalStatu.name}`;
        }

        // Update the data on the form
        this.maritalStatuForm.patchValue({
            id: this.maritalStatu.id,
            name: this.maritalStatu.name,
            description: this.maritalStatu.description
        });
    }

    save(): void {
        if (this.maritalStatuForm.dirty && this.maritalStatuForm.valid) {
            // Copy the form values over the maritalStatu object values
            let c = (<any>Object).assign({}, this.maritalStatu, this.maritalStatuForm.value);

            console.log(c);

            this.maritalStatuService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.maritalStatuForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {    
        // Reset the form to clear the flags
        this.maritalStatuForm.reset();
        this.router.navigate(['/maritalStatus']);
    }


    delete(): void {
        if (this.maritalStatu.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.maritalStatu.name}?`)) {
                this.maritalStatuService.delete(this.maritalStatu.id)
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