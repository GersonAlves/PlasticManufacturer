import { Component, OnInit } from '@angular/core';
import { ICategory } from './category.model';
import { CategoryService } from './category.service';

@Component({
    templateUrl: 'app/categories/category-list.component.html',
})

export class CategoryListComponent implements OnInit {
    pageTitle: string = 'Category List';
       errorMessage: string;

       Categories: ICategory[];

       constructor(private CategoryService: CategoryService) {   }

    ngOnInit(): void {
        console.log(this.CategoryService.getAll());
        this.CategoryService.getAll()
            .subscribe(Categories => this.Categories = Categories,
            error => this.errorMessage = <any>error);

        console.log(this.Categories);
    }

}