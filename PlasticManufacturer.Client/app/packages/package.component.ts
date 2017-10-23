import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IPackage } from './package.model'
import { PackageService } from './package.service'

import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: 'app/packages/package.component.html'
})


export class PackageComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

   packageForm: FormGroup;
   package: IPackage;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Package';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private packageService: PackageService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this. packageForm = this.formBuilder.group({
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
        Observable.merge(this.packageForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.packageForm);
        });
    }

    getPackage(id: number): void {
        if (id !== 0) {
            this.packageService.getById(id)
                .subscribe(
                (packages: IPackage) => this.onCorrierRetrieved(packages),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(packages: IPackage): void {
        if (this.packageForm) {
            this.packageForm.reset();
        }
        this.package = packages;

        if (this.package.id === 0) {
            this.pageTitle = 'Add Package';
        } else {
            this.pageTitle = `Edit Package  : ${this.package.name}`;
        }

        // Update the data on the form
        this.packageForm.patchValue({
            id: this.package.id,
            name: this.package.name,
            description: this.package.description
        });
    }

    save(): void {
        if (this.packageForm.dirty && this.packageForm.valid) {
            // Copy the form values over the package object values
            let c = Object.assign({}, this.package, this.packageForm.value);

            console.log(c);

            this.packageService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.packageForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.packageForm.reset();
        this.router.navigate(['/packages']);
    }


    delete(): void {
        if (this.package.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.package.name}?`)) {
                this.packageService.delete(this.package.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/packages'])
    }


}
