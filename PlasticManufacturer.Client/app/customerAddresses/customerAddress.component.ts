import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomerAddress } from './customerAddress.model'
import { CustomerAddressService } from './customerAddress.service'
import { ICity, CityService } from '../cities/index'
import { IState, StateService } from '../states/index'
import { IAddressType, AddressTypeService } from '../addressTypes/index'
import { ICustomer, CustomerService } from '../customers/index' 
import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/customerAddresses/customerAddress.component.html'
})

export class CustomerAddressComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    customerAddressForm: FormGroup;
    customerAddress: ICustomerAddress;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Customer Address';
    cities: ICity[];
    states: IState[];
    addressTypes: IAddressType[];
    customer: ICustomer[];
    //filteredOptions: Observable<string[]>;
    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router,
        private customerAddressService: CustomerAddressService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private cityService: CityService,
        private stateService: StateService,
        private addressService: AddressTypeService,
        private customerService: CustomerService
         ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'costumer address name is required.'
            }
        };
        
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.customerAddressForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: '',
            city_Id: undefined,
            state_Id: undefined,
            addressType_Id: undefined,
            zipCode: '',
            phone: '',
            fax: '',
            street: '',
            complement: '',
            customers_Id: undefined
        });
      
        // Read the customerAddress Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCustomerAddress(id);
            }

        );
        this.loadCity();
        this.loadState();
        this.loadAddressType();
        this.loadCustomer();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.customerAddressForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerAddressForm);
        });
    }

    getCustomerAddress(id: number): void {
        if (id !== 0) {
            this.customerAddressService.getById(id)
                .subscribe(
                (customerAddress: ICustomerAddress) => this.onCorrierRetrieved(customerAddress),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(customerAddress: ICustomerAddress): void {
        if (this.customerAddressForm) {
            this.customerAddressForm.reset();
        }
        this.customerAddress = customerAddress;

        if (this.customerAddress.id === 0) {
            this.pageTitle = 'Add Customer Address';
        } else {
            this.pageTitle = `Edit Customer Address  : ${this.customerAddress.name}`;
        }

        // Update the data on the form
        this.customerAddressForm.patchValue({
            id: this.customerAddress.id,
            name: this.customerAddress.name,
            description: this.customerAddress.description,
            city_Id: this.customerAddress.city_Id,
            addressType_Id: this.customerAddress.addressType_Id,
            state_Id: this.customerAddress.state_Id,
            zipCode: this.customerAddress.zipCode,
            phone: this.customerAddress.phone,
            fax: this.customerAddress.fax,
            street: this.customerAddress.street,
            complement: this.customerAddress.complement,
            customers_Id: this.customerAddress.customers_Id
        });
    }

    save(): void {
        if (this.customerAddressForm.dirty && this.customerAddressForm.valid) {
            // Copy the form values over the customerAddress object values
            let c = (<any>Object).assign({}, this.customerAddress, this.customerAddressForm.value);

            this.customerAddressService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerAddressForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customerAddressForm.reset();
        this.router.navigate(['/customerAddresses']);
    }
    
    delete(): void {
        if (this.customerAddress.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.customerAddress.name}?`)) {
                this.customerAddressService.delete(this.customerAddress.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    cancel() {
        this.router.navigate(['/customerAddresses'])
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

    loadAddressType(): void {
        this.addressService.getAll()
            .subscribe(addressTypes => this.addressTypes = addressTypes,
            error => this.errorMessage = <any>error);
    }

    loadCustomer(): void {
        this.customerService.getAll()
            .subscribe(customers => this.customer = customers,
            error => this.errorMessage = <any>error);
    }
}