import { Component, OnInit } from '@angular/core';
import { IOperationType } from './operationType.model';
import { OperationTypeService } from './operationType.service';

@Component({
    templateUrl: 'app/operationTypes/operationType-list.component.html',
})

export class OperationTypeListComponent implements OnInit {
    pageTitle: string = 'Operation Type List';
    errorMessage: string;

    operationTypes: IOperationType[];

    constructor(private operationTypeService:OperationTypeService) { }

    ngOnInit(): void {
        this.operationTypeService.getAll()
            .subscribe(operationTypes => this.operationTypes = operationTypes,
            error => this.errorMessage = <any>error);
    }

}