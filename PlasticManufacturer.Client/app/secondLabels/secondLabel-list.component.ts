import { Component, OnInit } from '@angular/core';
import { ISecondLabel } from './secondLabel.model';
import { SecondLabelService } from './secondLabel.service';

@Component({
    templateUrl: 'app/secondLabels/secondLabel-list.component.html',
})

export class SecondLabelListComponent implements OnInit {
    pageTitle: string = 'Second Label List';
    errorMessage: string;

    secondLabels: ISecondLabel[];

    constructor(private secondLabelService: SecondLabelService) { }

    ngOnInit(): void {
        this.secondLabelService.getAll()
            .subscribe(secondLabels => this.secondLabels = secondLabels,
            error => this.errorMessage = <any>error);
    }

}