import { Component, OnInit } from '@angular/core';
import { IPackage } from './package.model';
import { PackageService} from './package.service';

@Component({
    templateUrl: 'app/packages/package-list.component.html',
})

export class PackageListComponent implements OnInit {
    pageTitle: string = 'Package List';
    errorMessage: string;

    packages: IPackage[];

    constructor(private packageService: PackageService) { }

    ngOnInit(): void {
        console.log(this.packageService.getAll());
        this.packageService.getAll()
            .subscribe(packages => this.packages = packages,
            error => this.errorMessage = <any>error);

        console.log(this.packages);
    }

}