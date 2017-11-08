import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IEmployee } from './employee.model'
import { EmployeeService } from './employee.service'

import { GenericValidator } from '../shared/generic-validator';

//load combobox
import { IGender } from '../genders/gender.model'
import { GenderService } from '../genders/gender.service'
import { IMaritalStatus } from '../maritalStatus/maritalStatus.model'
import { MaritalStatusService } from '../maritalStatus/maritalStatus.service'
import { ICity } from '../cities/city.model'
import { CityService } from '../cities/city.service'
import { IState } from '../states/state.model'
import { StateService } from '../states/state.service'
import { ITitle } from '../titles/title.model'
import { TitleService } from '../titles/title.service'
import { IDepartment } from '../departments/department.model'
import { DepartmentService } from '../departments/department.service'



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


    //load combobox
    genders: IGender[];
    maritalStatus: IMaritalStatus[];
    cities: ICity[];
    states: IState[];
    titles: ITitle[];
    departments: IDepartment[];


    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router,
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private genderService: GenderService,
        private route: ActivatedRoute,
        private maritalStatusService: MaritalStatusService,
        private cityService: CityService,
        private stateService: StateService,
        private titleService: TitleService,
        private departmentService: DepartmentService ) {

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
            name: ['', Validators.required],
            description: '',
            email: '',
            status: true,
            lastName: '',
            birthday: '',
            gender_Id: undefined,
            maritalStatus_Id: undefined,
            address: '',
            city_Id: undefined,
            state_Id: undefined,
            zipCode: '',
            telephone: '',
            ss: '',
            hireDate: '',
            title_Id: undefined,
            department_Id: undefined,
        });

        //loads combobox
        this.loadGender();
        this.loadMarital();
        this.loadCity();
        this.loadState();
        this.loadTitle();
        this.loadDepartment();

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
            description: this.employee.description,
            email: this.employee.email,
            status: this.employee.status,
            lastName: this.employee.lastName,
            birthday: this.employee.birthday,
            gender_Id: this.employee.gender_Id,
            maritalStatus_Id: this.employee.maritalStatus_Id,
            address: this.employee.address,
            city_Id: this.employee.city_Id,
            state_Id: this.employee.state_Id,
            zipCode: this.employee.zipCode,
            telephone: this.employee.telephone,
            ss: this.employee.ss,
            hireDate: this.employee.hireDate,
            title_Id: this.employee.title_Id,
            department_Id: this.employee.department_Id
        });
    }

    save(): void {
        if (this.employeeForm.dirty && this.employeeForm.valid) {
            // Copy the form values over the employee object values
            let c = (<any>Object).assign({}, this.employee, this.employeeForm.value);
            console.log(c);
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

    //loads combobox
    loadGender(): void {
        this.genderService.getAll()
            .subscribe(genders => this.genders = genders,
            error => this.errorMessage = <any>error);
    }

    loadMarital(): void {
        this.maritalStatusService.getAll()
            .subscribe(maritalStatus => this.maritalStatus = maritalStatus,
            error => this.errorMessage = <any>error);
    }

    loadCity(): void {
        this.cityService.getAll()
            .subscribe(cities => this.cities = cities,
            error => this.errorMessage = <any>error);
    }

    loadState(): void {
        this.stateService.getAll()
            .subscribe(states => this.states = states,
            error => this.errorMessage = <any>error);
    }

    loadTitle(): void {
        this.titleService.getAll()
            .subscribe(titles => this.titles = titles,
            error => this.errorMessage = <any>error);
    }

    loadDepartment(): void {
        this.departmentService.getAll()
            .subscribe(departments => this.departments = departments,
            error => this.errorMessage = <any>error);
    }
}