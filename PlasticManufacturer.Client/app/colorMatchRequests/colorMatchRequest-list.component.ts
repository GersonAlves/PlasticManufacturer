import { Component, OnInit } from '@angular/core';
import { IColorMatchRequest } from './colorMatchRequest.model';
import { ColorMatchRequestService } from './colorMatchRequest.service';

@Component({
    templateUrl: 'app/colorMatchRequests/colorMatchRequest-list.component.html',
})

export class ColorMatchRequestListComponent implements OnInit {
    pageTitle: string = 'Color Match Request List';
    errorMessage: string;

    colorMatchRequests: IColorMatchRequest[];

    constructor(private colorMatchRequestService: ColorMatchRequestService) { }

    ngOnInit(): void {
        this.colorMatchRequestService.getAll()
            .subscribe(colorMatchRequests => this.colorMatchRequests = colorMatchRequests,
            error => this.errorMessage = <any>error);
    }

}