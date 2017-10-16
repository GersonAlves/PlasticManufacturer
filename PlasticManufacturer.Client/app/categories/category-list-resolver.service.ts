import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { CategoryService } from './category.service'

@Injectable()
export class CategoryListResolver implements Resolve<any>{
    constructor(private categoryService: CategoryService) {
    }

    resolve() {
        return this.categoryService.getAll()
    }

}