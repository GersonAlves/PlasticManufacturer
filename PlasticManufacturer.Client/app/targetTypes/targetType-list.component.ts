import { Component, OnInit } from '@angular/core';
import { ITargetType } from './targetType.model';
import { TargetTypeService } from './targetType.service';

@Component({
    templateUrl: 'app/targetTypes/targetType-list.component.html',
})

export class TargetTypeListComponent implements OnInit {
    pageTitle: string = 'Target Type';
    errorMessage: string;

    targetTypes: ITargetType[];

    constructor(private targetTypeService: TargetTypeService) { }

    ngOnInit(): void {
        this.targetTypeService.getAll()
            .subscribe(targetTypes => this.targetTypes = targetTypes,
            error => this.errorMessage = <any>error);
    }

}