import { Component, OnInit } from '@angular/core';
import { ITitle } from './title.model';
import { TitleService } from './title.service';

@Component({
    templateUrl: 'app/titles/title-list.component.html',
})

export class TitleListComponent implements OnInit {
    pageTitle: string = 'Title List';
    errorMessage: string;

    titles: ITitle[];

    constructor(private titleService: TitleService) { }

    ngOnInit(): void {
        this.titleService.getAll()
            .subscribe(titles => this.titles = titles,
            error => this.errorMessage = <any>error);
    }

}