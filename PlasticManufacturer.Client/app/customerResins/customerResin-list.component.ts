import { Component, OnInit } from '@angular/core';
import { ICustomerResin } from './customerResin.model';
import { CustomerResinService } from './customerResin.service';

@Component({
    templateUrl: 'app/customerResins/customerResin-list.component.html',
})

export class CustomerResinListComponent implements OnInit {
    pageTitle: string = 'Customer Resin List';
    errorMessage: string;

    customerResins: ICustomerResin[];

    constructor(private customerResinService: CustomerResinService) { }

    ngOnInit(): void {
        this.customerResinService.getAll()
            .subscribe(customerResins => this.customerResins = customerResins,
            error => this.errorMessage = <any>error);
    }

}