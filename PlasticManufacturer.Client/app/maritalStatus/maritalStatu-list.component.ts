import { Component, OnInit } from '@angular/core';
import { IMaritalStatu } from './maritalStatu.model';
import { MaritalStatuService } from './maritalStatu.service';

@Component({
    templateUrl: 'app/maritalStatus/maritalStatu-list.component.html',
})

export class MaritalStatuListComponent implements OnInit {
    pageTitle: string = 'MaritalStatu List';
       errorMessage: string;

       maritalStatus: IMaritalStatu[];

    constructor(private maritalStatuService: MaritalStatuService) {   }

    ngOnInit(): void {
        console.log(this.maritalStatuService.getAll());
        this.maritalStatuService.getAll()
            .subscribe(maritalStatus => this.maritalStatus = maritalStatus,
            error => this.errorMessage = <any>error);
    }

}