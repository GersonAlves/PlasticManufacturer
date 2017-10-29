import { Component, OnInit } from '@angular/core';
import { IOpacity } from './opacity.model';
import { OpacityService } from './opacity.service';

@Component({
    templateUrl: 'app/opacities/opacity-list.component.html'
})

export class OpacityListComponent implements OnInit {
    pageTitle: string = 'Opacity List';
    errorMessage: string;

    opacities: IOpacity[];

    constructor(private opacityService: OpacityService) { }

    ngOnInit(): void {
        this.opacityService.getAll()
            .subscribe(opacities => this.opacities = opacities,
            error => this.errorMessage = <any>error);
    }

}