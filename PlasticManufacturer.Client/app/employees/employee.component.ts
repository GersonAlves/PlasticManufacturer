import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IEmployee }from './employee.model'
import { EmployeeService } from './employee.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/employees/employee.component.html'
})

export class EmployeeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    employeeForm: FormGroup;
    employee: IEmployee;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'employee';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private employeeService: EmployeeService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.employeeForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the employee Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getemployee(id);
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
        Observable.merge(this.employeeForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.employeeForm);
        });
    }

    getemployee(id: number): void {
        if (id !== 0) {
            this.employeeService.getById(id)
                .subscribe(
                (employee: IEmployee) => this.onCorrierRetrieved(employee),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(employee: IEmployee): void {
        if (this.employeeForm) {
            this.employeeForm.reset();
        }
        this.employee = employee;

        if (this.employee.id === 0) {
            this.pageTitle = 'Add employee';
        } else {
            this.pageTitle = `Edit employee  : ${this.employee.name}`;
        }

        // Update the data on the form
        this.employeeForm.patchValue({
            id: this.employee.id,
            name: this.employee.name,
            description: this.employee.description
        });
    }

    save(): void {
        if (this.employeeForm.dirty && this.employeeForm.valid) {
            // Copy the form values over the employee object values
            let c = (<any>Object).assign({}, this.employee, this.employeeForm.value);

            this.employeeService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.employeeForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.employeeForm.reset();
        this.router.navigate(['/employees']);
    }


    delete(): void {
        if (this.employee.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.employee.name}?`)) {
                this.employeeService.delete(this.employee.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/employees'])
    }


}