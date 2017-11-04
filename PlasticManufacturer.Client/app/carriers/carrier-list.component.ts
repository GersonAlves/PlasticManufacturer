import { Component, OnInit } from '@angular/core';
import { ICarrier } from './carrier.model';
import { CarrierService } from './carrier.service';

@Component({
    templateUrl: 'app/carriers/carrier-list.component.html',
})

export class CarrierListComponent implements OnInit {
    pageTitle: string = 'Carrier List';
       errorMessage: string;

    carriers: ICarrier[];

    constructor(private carrierService: CarrierService) {   }

    ngOnInit(): void {
        this.carrierService.getAll()
            .subscribe(carriers => this.carriers = carriers,
            error => this.errorMessage = <any>error);
    }

}