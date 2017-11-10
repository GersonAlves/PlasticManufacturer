import { Component, OnInit } from '@angular/core';
import { ICustomerContacted } from './customerContacted.model';
import { CustomerContactedService } from './customerContacted.service';

@Component({
    templateUrl: 'app/customerContacteds/customerContacted-list.component.html',
})

export class CustomerContactedListComponent implements OnInit {
    pageTitle: string = 'Customer Contacted List';
    errorMessage: string;

    customerContacteds: ICustomerContacted[];

    constructor(private customerContactedService: CustomerContactedService) { }

    ngOnInit(): void {
        this.customerContactedService.getAll()
            .subscribe(customerContacteds => this.customerContacteds = customerContacteds,
            error => this.errorMessage = <any>error);
    }

}