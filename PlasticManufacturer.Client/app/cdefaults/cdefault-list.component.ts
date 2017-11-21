import { Component, OnInit } from '@angular/core';
import { ICdefault } from './cdefault.model';
import { CdefaultService } from './cdefault.service';

@Component({
    templateUrl: 'app/cdefaults/cdefault-list.component.html',
})

export class CdefaultListComponent implements OnInit {
    pageTitle: string = 'cdefault List';
    errorMessage: string;

    cdefaults: ICdefault[];

    constructor(private cdefaultService: CdefaultService) { }

    ngOnInit(): void {
        this.cdefaultService.getAll()
            .subscribe(cdefaults => this.cdefaults = cdefaults,
            error => this.errorMessage = <any>error);
    }

}