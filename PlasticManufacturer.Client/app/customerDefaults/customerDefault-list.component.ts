import { Component, OnInit } from '@angular/core';
import { ICustomerDefault } from './customerDefault.model';
import { CustomerDefaultService } from './customerDefault.service';

@Component({
    templateUrl: 'app/customerDefaults/customerDefault-list.component.html',
})

export class CustomerDefaultListComponent implements OnInit {
    pageTitle: string = 'CustomerDefault List';
       errorMessage: string;

       customerDefaults: ICustomerDefault[];

       constructor(private customerDefaultService: CustomerDefaultService) {   }

    ngOnInit(): void {
        this.customerDefaultService.getAll()
            .subscribe(customerDefaults => this.customerDefaults = customerDefaults,
            error => this.errorMessage = <any>error);
    }

}