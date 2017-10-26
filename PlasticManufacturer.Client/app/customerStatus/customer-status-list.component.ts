import { Component, OnInit } from '@angular/core';
import { ICustomerStatus } from './customer-status.model';
import { CustomerStatusService } from './customer-status.service';

@Component({
    templateUrl: 'app/customerStatus/customer-status-list.component.html',
})

export class CustomerStatusListComponent implements OnInit {
    pageTitle: string = 'Customer Status List';
    errorMessage: string;

    customerStatus: ICustomerStatus[];

    constructor(private customerStatusService: CustomerStatusService) { }

    ngOnInit(): void {
        console.log(this.customerStatusService.getAll());
        this.customerStatusService.getAll()
            .subscribe(customerStatus => this.customerStatus = customerStatus,
            error => this.errorMessage = <any>error);

        console.log(this.customerStatus);
    }

}