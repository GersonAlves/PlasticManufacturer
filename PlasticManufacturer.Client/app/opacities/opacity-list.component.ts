import { Component, OnInit } from '@angular/core';
import { IOpacity } from './opacity.model';
import { OpacityService } from './opacity.service';

@Component({
    templateUrl: 'app/carriers/carrier-list.component.html',
})

export class OpacityListComponent implements OnInit {
    pageTitle: string = 'Opacity List';
    errorMessage: string;

    opacities: IOpacity[];

    constructor(private opacityService: OpacityService) { }

    ngOnInit(): void {
        console.log(this.opacityService.getAll());
        this.opacityService.getAll()
            .subscribe(opacities => this.opacities = opacities,
            error => this.errorMessage = <any>error);

        console.log(this.opacities);
    }

}