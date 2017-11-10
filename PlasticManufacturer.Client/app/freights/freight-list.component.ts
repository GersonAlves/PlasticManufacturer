import { Component, OnInit } from '@angular/core';
import { IFreight } from './freight.model';
import { FreightService } from './freight.service';

@Component({
    templateUrl: 'app/freights/freight-list.component.html',
})

export class FreightListComponent implements OnInit {
    pageTitle: string = 'Freight List';
    errorMessage: string;

    freights: IFreight[];

    constructor(private freightService: FreightService) { }

    ngOnInit(): void {
        this.freightService.getAll()
            .subscribe(freights => this.freights = freights,
            error => this.errorMessage = <any>error);
    }

}