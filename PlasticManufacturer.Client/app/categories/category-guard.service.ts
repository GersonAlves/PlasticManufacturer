import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CategoryComponent } from './category.component';

@Injectable()
export class CategoryGuard implements CanDeactivate<CategoryComponent> {

    canDeactivate(component: CategoryComponent): boolean {
        if (component.categoryForm.dirty) {
            let name = component.categoryForm.get('name').value || 'New city';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}