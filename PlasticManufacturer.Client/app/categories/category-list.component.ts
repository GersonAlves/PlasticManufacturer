import { Component, OnInit } from '@angular/core';
import { ICategory } from './category.model';
import { CategoryService } from './category.service';

@Component({
    templateUrl: 'app/categories/category-list.component.html',
})

export class CategoryListComponent implements OnInit {
    pageTitle: string = 'category List';
    errorMessage: string;

    categories: ICategory[];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.getAll()
            .subscribe(categories => this.categories = categories,
            error => this.errorMessage = <any>error);
    }

}