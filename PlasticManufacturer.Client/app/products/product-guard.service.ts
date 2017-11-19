import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ProductComponent } from './product.component';

@Injectable()
export class ProductGuard implements CanDeactivate<ProductComponent> {

    canDeactivate(component: ProductComponent): boolean {
        if (component.productForm.dirty) {
            let name = component.productForm.get('name').value || 'New product';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}