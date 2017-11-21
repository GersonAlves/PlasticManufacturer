import { Component, OnInit } from '@angular/core';
import { IMarkup } from './markup.model';
import { MarkupService } from './markup.service';

@Component({
    templateUrl: 'app/categories/markup-list.component.html',
})

export class MarkupListComponent implements OnInit {
    pageTitle: string = 'markup List';
    errorMessage: string;

    categories: IMarkup[];

    constructor(private markupService: MarkupService) { }

    ngOnInit(): void {
        this.markupService.getAll()
            .subscribe(categories => this.categories = categories,
            error => this.errorMessage = <any>error);
    }

}