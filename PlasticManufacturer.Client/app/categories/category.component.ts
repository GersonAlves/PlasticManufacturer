import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CategoryService } from './category.service'
import { CategoriesListComponent } from './category-list.component'
import { NgForm } from '@angular/forms'

@Component({
    templateUrl: 'app/categories/category.component.html'
})

export class CategoryComponent {
    isDirty: boolean = true
    category: any

    constructor(private router: Router, private categoryService: CategoryService) { }

    save(categoryForm: NgForm) {
        console.log(categoryForm);
        this.categoryService.save(categoryForm.value).subscribe(category => {
            categoryForm.reset()
            this.router.navigate(['/categories'])
        })
    }

    cancel() {
        console.log('cancel');
        this.router.navigate([''])
    }
}