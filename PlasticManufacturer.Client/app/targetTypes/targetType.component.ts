import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ITargetType, TargetTypeService } from './index'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/targetTypes/targetType.component.html'
})

export class TargetTypeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    targetTypeForm: FormGroup;
    targetType: ITargetType;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Target Type';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private targetTypeService: TargetTypeService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Target Type name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.targetTypeForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the targetType Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.gettargetType(id);
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
        Observable.merge(this.targetTypeForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.targetTypeForm);
        });
    }

    gettargetType(id: number): void {
        if (id !== 0) {
            this.targetTypeService.getById(id)
                .subscribe(
                (targetType: ITargetType) => this.onCorrierRetrieved(targetType),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(targetType: ITargetType): void {
        if (this.targetTypeForm) {
            this.targetTypeForm.reset();
        }
        this.targetType = targetType;

        if (this.targetType.id === 0) {
            this.pageTitle = 'Add Target Type';
        } else {
            this.pageTitle = `Edit Target Type  : ${this.targetType.name}`;
        }

        // Update the data on the form
        this.targetTypeForm.patchValue({
            id: this.targetType.id,
            name: this.targetType.name,
            description: this.targetType.description
        });
    }

    save(): void {
        if (this.targetTypeForm.dirty && this.targetTypeForm.valid) {
            // Copy the form values over the targetType object values
            let c = (<any>Object).assign({}, this.targetType, this.targetTypeForm.value);

            this.targetTypeService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.targetTypeForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.targetTypeForm.reset();
        this.router.navigate(['/targetTypes']);
    }


    delete(): void {
        if (this.targetType.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.targetType.name}?`)) {
                this.targetTypeService.delete(this.targetType.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/targetTypes'])
    }


}