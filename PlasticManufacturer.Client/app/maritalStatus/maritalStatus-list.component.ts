import { Component, OnInit } from '@angular/core';
import { IMaritalStatus } from './maritalStatus.model';
import { MaritalStatusService } from './maritalStatus.service';

@Component({
    templateUrl: 'app/maritalStatus/maritalStatus-list.component.html',
})

export class MaritalStatusListComponent implements OnInit {
    pageTitle: string = 'Marital Status List';
       errorMessage: string;

       maritalStatus: IMaritalStatus[];

    constructor(private maritalStatusService: MaritalStatusService) {   }

    ngOnInit(): void {
        this.maritalStatusService.getAll()
            .subscribe(maritalStatus => this.maritalStatus = maritalStatus,
            error => this.errorMessage = <any>error);
    }

}