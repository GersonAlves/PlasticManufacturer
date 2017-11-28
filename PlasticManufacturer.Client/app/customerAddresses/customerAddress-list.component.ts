import { Component, OnInit } from '@angular/core';
import { ICustomerAddress } from './customerAddress.model';
import { CustomerAddressService } from './customerAddress.service';

@Component({
    templateUrl: 'app/customerAddresses/customerAddress-list.component.html',
})

export class CustomerAddressListComponent implements OnInit {
    pageTitle: string = 'Customer Address List';
    errorMessage: string;

    customerAddresses: ICustomerAddress[];

    constructor(private customerAddressService: CustomerAddressService) { }

    ngOnInit(): void {
        this.customerAddressService.getAll()
            .subscribe(customerAddresses => this.customerAddresses = customerAddresses,
            error => this.errorMessage = <any>error);
    }

}