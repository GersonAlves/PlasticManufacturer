import { Component, OnInit } from '@angular/core';
import { IShippingMethod } from './shippingmethod.model';
import { ShippingMethodService } from './shippingMethod.service';

@Component({
    templateUrl: 'app/shippingMethods/shippingMethod-list.component.html',
})

export class ShippingMethodListComponent implements OnInit {
    pageTitle: string = 'ShippingMethod List';
    errorMessage: string;

    shippingMethods: IShippingMethod[];

    constructor(private shippingMethodService: ShippingMethodService) { }

    ngOnInit(): void {
        this.shippingMethodService.getAll()
            .subscribe(shippingMethods => this.shippingMethods = shippingMethods,
            error => this.errorMessage = <any>error);
    }

}