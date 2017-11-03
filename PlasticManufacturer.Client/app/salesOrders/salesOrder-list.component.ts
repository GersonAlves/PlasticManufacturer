import { Component, OnInit } from '@angular/core';
import { ISalesOrder } from './salesOrder.model';
import { SalesOrderService } from './salesOrder.service';

@Component({
    templateUrl: 'app/salesOrders/salesOrder-list.component.html'
})

export class SalesOrderListComponent implements OnInit {
    pageTitle: string = 'SalesOrder List';
    errorMessage: string;

    opacities: ISalesOrder[];

    constructor(private salesOrderService: SalesOrderService) { }

    ngOnInit(): void {
        console.log(this.salesOrderService.getAll());
        this.salesOrderService.getAll()
            .subscribe(opacities => this.opacities = opacities,
            error => this.errorMessage = <any>error);

        console.log(this.opacities);
    }

}