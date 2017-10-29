import { Component, OnInit } from '@angular/core';
import { ICity } from './city.model';
import { CityService } from './city.service';

@Component({
    templateUrl: 'app/cities/city-list.component.html',
})

export class CityListComponent implements OnInit {
    pageTitle: string = 'City List';
    errorMessage: string;

    cities: ICity[];

    constructor(private cityService: CityService) { }

    ngOnInit(): void {
        this.cityService.getAll()
            .subscribe(cities => this.cities = cities,
            error => this.errorMessage = <any>error);
    }

}