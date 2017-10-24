import { Component, OnInit } from '@angular/core';
import { IPackaging } from './packaging.model';
import { PackagingService } from './packaging.service';

@Component({
    templateUrl: 'app/packagings/packaging-list.component.html',
})

export class PackagingListComponent implements OnInit {
    pageTitle: string = 'Package List';
    errorMessage: string;

    packagings: IPackaging[];

    constructor(private packagingService: PackagingService) { }

    ngOnInit(): void {
        console.log(this.packagingService.getAll());
        this.packagingService.getAll()
            .subscribe(packaging => this.packagings = packaging,
            error => this.errorMessage = <any>error);

    }

}