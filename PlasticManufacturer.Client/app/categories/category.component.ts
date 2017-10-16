import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CategoryService } from './category.service'
import { CategoriesListComponent } from './category-list.component'

@Component({
    templateUrl: 'app/categories/category.component.html'
})

export class CategoryComponent {
    isDirty: boolean = true
    category: any

    constructor(private router: Router, private categoryService: CategoryService) { }

    save(formValues) {
        console.log(formValues);
        this.categoryService.save(formValues).subscribe(category => {
             this.router.navigate(['/categories'])
        })
    }

    cancel() {
        console.log('cancel');
        this.router.navigate([''])
    }
}