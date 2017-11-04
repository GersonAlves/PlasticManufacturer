import { Component, OnInit } from '@angular/core';
import { ICustomerRating } from './customerRating.model';
import { CustomerRatingService } from './customerRating.service';

@Component({
    templateUrl: 'app/customerRatings/customerRating-list.component.html',
})

export class CustomerRatingListComponent implements OnInit {
    pageTitle: string = 'Customer Rating List';
       errorMessage: string;

       customerRatings: ICustomerRating[];

       constructor(private customerRatingService: CustomerRatingService) {   }

    ngOnInit(): void {
        this.customerRatingService.getAll()
            .subscribe(customerRatings => this.customerRatings = customerRatings,
            error => this.errorMessage = <any>error);
    }

}