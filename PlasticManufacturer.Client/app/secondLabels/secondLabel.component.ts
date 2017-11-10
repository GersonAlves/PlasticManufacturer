import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ISecondLabel } from './secondLabel.model'
import { SecondLabelService } from './secondLabel.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/secondLabels/secondLabel.component.html'
})

export class SecondLabelComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    secondLabelForm: FormGroup;
    secondLabel: ISecondLabel;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Second Label';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private secondLabelService: SecondLabelService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.secondLabelForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the secondLabel Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getsecondLabel(id);
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
        Observable.merge(this.secondLabelForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.secondLabelForm);
        });
    }

    getsecondLabel(id: number): void {
        if (id !== 0) {
            this.secondLabelService.getById(id)
                .subscribe(
                (secondLabel: ISecondLabel) => this.onCorrierRetrieved(secondLabel),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(secondLabel: ISecondLabel): void {
        if (this.secondLabelForm) {
            this.secondLabelForm.reset();
        }
        this.secondLabel = secondLabel;

        if (this.secondLabel.id === 0) {
            this.pageTitle = 'Add Second Label';
        } else {
            this.pageTitle = `Edit Second Label  : ${this.secondLabel.name}`;
        }

        // Update the data on the form
        this.secondLabelForm.patchValue({
            id: this.secondLabel.id,
            name: this.secondLabel.name,
            description: this.secondLabel.description
        });
    }

    save(): void {
        if (this.secondLabelForm.dirty && this.secondLabelForm.valid) {
            // Copy the form values over the secondLabel object values
            let c = (<any>Object).assign({}, this.secondLabel, this.secondLabelForm.value);

            this.secondLabelService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.secondLabelForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.secondLabelForm.reset();
        this.router.navigate(['/secondLabels']);
    }


    delete(): void {
        if (this.secondLabel.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.secondLabel.name}?`)) {
                this.secondLabelService.delete(this.secondLabel.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/secondLabels'])
    }


}