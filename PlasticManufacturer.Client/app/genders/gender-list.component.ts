import { Component, OnInit } from '@angular/core';
import { IGender } from './gender.model';
import { GenderService } from './gender.service';

@Component({
    templateUrl: 'app/genders/gender-list.component.html',
})

export class GenderListComponent implements OnInit {
    pageTitle: string = 'gender List';
    errorMessage: string;

    genders: IGender[];

    constructor(private genderService: GenderService) { }

    ngOnInit(): void {
        console.log(this.genderService.getAll());
        this.genderService.getAll()
            .subscribe(genders => this.genders = genders,
            error => this.errorMessage = <any>error);
    }

}