import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IAddressType } from './addressType.model'
import { AddressTypeService } from './addressType.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/addressTypes/addressType.component.html'
})

export class AddressTypeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    addressTypeForm: FormGroup;
    addressType: IAddressType;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Address Type';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private addressTypeService: AddressTypeService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.addressTypeForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the addressType Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getAddressType(id);
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
        Observable.merge(this.addressTypeForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.addressTypeForm);
        });
    }

    getAddressType(id: number): void {
        if (id !== 0) {
            this.addressTypeService.getById(id)
                .subscribe(
                (addressType: IAddressType) => this.onCorrierRetrieved(addressType),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(addressType: IAddressType): void {
        if (this.addressTypeForm) {
            this.addressTypeForm.reset();
        }
        this.addressType = addressType;

        if (this.addressType.id === 0) {
            this.pageTitle = 'Add AddressType';
        } else {
            this.pageTitle = `Edit Address Type  : ${this.addressType.name}`;
        }

        // Update the data on the form
        this.addressTypeForm.patchValue({
            id: this.addressType.id,
            name: this.addressType.name,
            description: this.addressType.description
        });
    }

    save(): void {
        if (this.addressTypeForm.dirty && this.addressTypeForm.valid) {
            // Copy the form values over the addressType object values
            let c = (<any>Object).assign({}, this.addressType, this.addressTypeForm.value);

            this.addressTypeService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.addressTypeForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.addressTypeForm.reset();
        this.router.navigate(['/addressTypes']);
    }


    delete(): void {
        if (this.addressType.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.addressType.name}?`)) {
                this.addressTypeService.delete(this.addressType.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/addressTypes'])
    }


}