import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IState } from './state.model'
import { StateService } from './state.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/states/state.component.html'
})

export class StateComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    stateForm: FormGroup;
    state: IState;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'State';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private stateService: StateService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'State name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.stateForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the state Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getstate(id);
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
        Observable.merge(this.stateForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.stateForm);
        });
    }

    getstate(id: number): void {
        if (id !== 0) {
            this.stateService.getById(id)
                .subscribe(
                (state: IState) => this.onCorrierRetrieved(state),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(state: IState): void {
        if (this.stateForm) {
            this.stateForm.reset();
        }
        this.state = state;

        if (this.state.id === 0) {
            this.pageTitle = 'Add state';
        } else {
            this.pageTitle = `Edit state  : ${this.state.name}`;
        }

        // Update the data on the form
        this.stateForm.patchValue({
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        });
    }

    save(): void {
        if (this.stateForm.dirty && this.stateForm.valid) {
            // Copy the form values over the state object values
            let c = (<any>Object).assign({}, this.state, this.stateForm.value);

            this.stateService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.stateForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.stateForm.reset();
        this.router.navigate(['/states']);
    }


    delete(): void {
        if (this.state.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.state.name}?`)) {
                this.stateService.delete(this.state.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/states'])
    }


}