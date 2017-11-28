import { Component, OnInit } from '@angular/core';
import { IAddressType } from './addressType.model';
import { AddressTypeService } from './addressType.service';

@Component({
    templateUrl: 'app/addressTypes/addressType-list.component.html',
})

export class AddressTypeListComponent implements OnInit {
    pageTitle: string = 'Address Type List';
    errorMessage: string;

    addressTypes: IAddressType[];

    constructor(private addressTypeService: AddressTypeService) { }

    ngOnInit(): void {
        this.addressTypeService.getAll()
            .subscribe(addressTypes => this.addressTypes = addressTypes,
            error => this.errorMessage = <any>error);
    }

}