import { Component, OnInit } from '@angular/core';
import { IPellet } from './pellet.model';
import { PelletService } from './pellet.service';

@Component({
    templateUrl: 'app/pellets/pellet-list.component.html',
})

export class PelletListComponent implements OnInit {
    pageTitle: string = 'Pellet List';
    errorMessage: string;

    pellets: IPellet[];

    constructor(private pelletService: PelletService) { }

    ngOnInit(): void {
        this.pelletService.getAll()
            .subscribe(pellets => this.pellets = pellets,
            error => this.errorMessage = <any>error);
    }

}