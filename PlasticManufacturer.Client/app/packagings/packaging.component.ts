import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IPackaging } from './packaging.model'
import { PackagingService } from './packaging.service'

import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: 'app/packagings/packaging.component.html'
})


export class PackagingComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    packagingForm: FormGroup;
    packaging: IPackaging;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Packaging';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private packagingService: PackagingService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.packagingForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the  package Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getPackage(id);
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
        Observable.merge(this.packagingForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.packagingForm);
        });
    }

    getPackage(id: number): void {
        if (id !== 0) {
            this.packagingService.getById(id)
                .subscribe(
                (packages: IPackaging) => this.onCorrierRetrieved(packages),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(packaging: IPackaging): void {
        if (this.packagingForm) {
            this.packagingForm.reset();
        }
        this.packaging = packaging;

        if (this.packaging.id === 0) {
            this.pageTitle = 'Add Package';
        } else {
            this.pageTitle = `Edit Package  : ${this.packaging.name}`;
        }

        // Update the data on the form
        this.packagingForm.patchValue({
            id: this.packaging.id,
            name: this.packaging.name,
            description: this.packaging.description
        });
    }

    save(): void {
        if (this.packagingForm.dirty && this.packagingForm.valid) {
            // Copy the form values over the package object values
            let c = Object.assign({}, this.packaging, this.packagingForm.value);

            console.log(c);

            this.packagingService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.packagingForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.packagingForm.reset();
        this.router.navigate(['/packagings']);
    }


    delete(): void {
        if (this.packaging.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the packaging: ${this.packaging.name}?`)) {
                this.packagingService.delete(this.packaging.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    cancel() {
        this.router.navigate(['/packagings'])
    }


}
