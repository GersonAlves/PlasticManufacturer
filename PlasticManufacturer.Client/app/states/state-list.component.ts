import { Component, OnInit } from '@angular/core';
import { IState } from './state.model';
import { StateService } from './state.service';

@Component({
    templateUrl: 'app/states/state-list.component.html',
})

export class StatetListComponent implements OnInit {
    pageTitle: string = 'State List';
    errorMessage: string;

    states: IState[];

    constructor(private stateService: StateService) { }

    ngOnInit(): void {
        this.stateService.getAll()
            .subscribe(states => this.states = states,
            error => this.errorMessage = <any>error);
    }

}