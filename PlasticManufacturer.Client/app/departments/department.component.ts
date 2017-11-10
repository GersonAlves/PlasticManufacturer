import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IDepartment } from './department.model'
import { DepartmentService } from './department.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/departments/department.component.html'
})

export class DepartmentComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    departmentForm: FormGroup;
    department: IDepartment;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Department';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private departmentService: DepartmentService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

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
        this.departmentForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the department Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getdepartment(id);
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
        Observable.merge(this.departmentForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.departmentForm);
        });
    }

    getdepartment(id: number): void {
        if (id !== 0) {
            this.departmentService.getById(id)
                .subscribe(
                (department: IDepartment) => this.onCorrierRetrieved(department),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(department: IDepartment): void {
        if (this.departmentForm) {
            this.departmentForm.reset();
        }
        this.department = department;

        if (this.department.id === 0) {
            this.pageTitle = 'Add department';
        } else {
            this.pageTitle = `Edit department  : ${this.department.name}`;
        }

        // Update the data on the form
        this.departmentForm.patchValue({
            id: this.department.id,
            name: this.department.name,
            description: this.department.description
        });
    }

    save(): void {
        if (this.departmentForm.dirty && this.departmentForm.valid) {
            // Copy the form values over the department object values
            let c = (<any>Object).assign({}, this.department, this.departmentForm.value);

            this.departmentService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.departmentForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.departmentForm.reset();
        this.router.navigate(['/departments']);
    }


    delete(): void {
        if (this.department.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.department.name}?`)) {
                this.departmentService.delete(this.department.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/departments'])
    }


}