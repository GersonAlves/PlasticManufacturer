import { Component, OnInit } from '@angular/core';
import { IRawMaterial } from './rawMaterial.model';
import { RawMaterialService } from './rawMaterial.service';

@Component({
    templateUrl: 'app/rawMaterials/rawMaterial-list.component.html',
})

export class RawMaterialListComponent implements OnInit {
    pageTitle: string = 'RawMaterial List';
    errorMessage: string;

    rawMaterials: IRawMaterial[];

    constructor(private rawMaterialService: RawMaterialService) { }

    ngOnInit(): void {
        this.rawMaterialService.getAll()
            .subscribe(rawMaterials => this.rawMaterials = rawMaterials,
            error => this.errorMessage = <any>error);
    }

}