import { Component, OnInit } from '@angular/core';
import { ICustomer } from './customer.model';
import { CustomerService } from './customer.service';

@Component({
    templateUrl: 'app/customers/customer-list.component.html',
})

export class CustomerListComponent implements OnInit {
    pageTitle: string = 'Carrier List';
    errorMessage: string;

    customers: ICustomer[];

    constructor(private customerService: CustomerService) { }

    ngOnInit(): void {
        console.log(this.customerService.getAll());
        this.customerService.getAll()
            .subscribe(customers => this.customers = customers,
            error => this.errorMessage = <any>error);

        console.log(this.customers);
    }

}