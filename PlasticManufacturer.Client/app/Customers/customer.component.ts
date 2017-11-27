import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomer } from './customer.model'
import { CustomerService } from './customer.service'

//load combobox
import { ICustomerStatus, CustomerStatusService } from '../customerStatus/index'
import { IEmployee, EmployeeService } from '../employees/index'
import { ICustomerContacted, CustomerContactedService } from '../customerContacteds/index'
import { ICustomerRating, CustomerRatingService } from '../customerRatings/index'
import { IFreight, FreightService } from '../freights/index'
import { ISecondLabel, SecondLabelService } from '../secondLabels/index'
import { ICity, CityService } from '../cities/index'
import { IState, StateService } from '../states/index'


import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: 'app/customers/customer.component.html',
    styleUrls: ['app/customers/StyleCustomers.css']
})

export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerForm: FormGroup;
    customer: ICustomer;

    //load combobox
    customerStatus: ICustomerStatus[];
    employees: IEmployee[];
    customerContacteds: ICustomerContacted[];
    customerRatings: ICustomerRating[];
    freights: IFreight[];
    secondLabels: ISecondLabel[];
    cities: ICity[];
    states: IState[];

    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'customer';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router,
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private customerStatusService: CustomerStatusService,
        private employeeService: EmployeeService,
        private customerContactedService: CustomerContactedService,
        private customerRatingService: CustomerRatingService,
        private freightService: FreightService,
        private cityService: CityService,
        private stateService: StateService, 
        private secondLabelService: SecondLabelService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'customer name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {

        this.customerForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.required],
            lastName: '',
            code: '',// tenho que definir
            rating_Id: undefined,
            status_Id: undefined,
            prospect: undefined,
            salesRepresentant_Id: undefined,
            authorizedBy_Id: undefined,
            contactedBy_Id: undefined,
            lead: undefined,
            fedId: undefined,
            notes: '',
            city_Id: undefined,
            state_Id: undefined,
            customerDefault: this.formBuilder.group({
                id: 0,
                freight_Id: undefined,
                freightDescription: '',
                mailingList: undefined,
                mutipleSites: undefined,
                reference: '',
                secondLabel_Id: undefined,
                note: ''
            })
        });

        //addresses: ICustomerAddress[]
        //customerDefaults_Id: number
        //shipViaAccounts: ICustomerShipViaAccount[]


        // loads combobox
        this.loadEmployees();
        this.loadCustomerStatus();
        this.loadCustomerContacteds();
        this.loadCustomerRatings();
        this.loadFreights();
        this.loadSecondLabels();
        this.loadCity();
        this.loadState();
       
        

        // Read the customer Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getcustomer(id);
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
        Observable.merge(this.customerForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerForm);
        });
    }

    getcustomer(id: number): void {
        if (id !== 0) {
            this.customerService.getById(id)
                .subscribe(
                (customer: ICustomer) => this.onCustomerRetrieved(customer),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }

    onCustomerRetrieved(customer: ICustomer): void {
        if (this.customerForm) {
            this.customerForm.reset();
        }

        console.log('passei 01');

        //let customerDefaultClone = this.customer.customerDefault;

        this.customer = customer;

        //if (!this.customer.customerDefault) this.customer.customerDefault = customerDefaultClone;

        //console.log('passei 02' + this.customer.customerDefault);


        if (this.customer.id === 0) {
            this.pageTitle = 'Add customer';
        } else {
            this.pageTitle = `Edit customer  : ${this.customer.name}`;
        }

       
        // Update the data on the form
        this.customerForm.patchValue({
            id: this.customer.id,
            name: this.customer.name,
            lastName: this.customer.lastName,
            status_Id: this.customer.status_Id,
            salesRepresentant_Id: this.customer.salesRepresentant_Id,
            authorizedBy_Id: this.customer.authorizedBy_Id,
            contactedBy_Id: this.customer.contactedBy_Id,
            rating_Id: this.customer.rating_Id,
            prospect: this.customer.prospect,
            lead: this.customer.lead,
            fedId: this.customer.fedId,
            notes: this.customer.notes,
            city_Id: this.customer.city_Id,
            state_Id: this.customer.state_Id,
            customerDefault: this.customer.customerDefault
        });
    }

    save(): void {
        if (this.customerForm.dirty && this.customerForm.valid) {
            // Copy the form values over the customer object values
            let c = (<any>Object).assign({}, this.customer, this.customerForm.value);

            this.customerService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customerForm.reset();
        this.router.navigate(['/customers']);
    }

    delete(): void {
        if (this.customer.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customer.name}?`)) {
                this.customerService.delete(this.customer.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    cancel() {
        this.router.navigate(['/customers'])
    }


    loadCustomerStatus(): void {
        this.customerStatusService.getAll()
            .subscribe(customerStatus => this.customerStatus = customerStatus,
            error => this.errorMessage = <any>error);
    }
    loadEmployees(): void {
        this.employeeService.getAll()
            .subscribe(employees => this.employees = employees,
            error => this.errorMessage = <any>error);
    }

    loadCustomerContacteds(): void {
        this.customerContactedService.getAll()
            .subscribe(customerContacteds => this.customerContacteds = customerContacteds,
            error => this.errorMessage = <any>error);
    }

    loadCustomerRatings(): void {
        this.customerRatingService.getAll()
            .subscribe(customerRatings => this.customerRatings = customerRatings,
            error => this.errorMessage = <any>error);
    }
    loadFreights(): void {
        this.freightService.getAll()
            .subscribe(freights => this.freights = freights,
            error => this.errorMessage = <any>error);
    }
    loadSecondLabels(): void {
        this.secondLabelService.getAll()
            .subscribe(secondLabels => this.secondLabels = secondLabels,
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

}