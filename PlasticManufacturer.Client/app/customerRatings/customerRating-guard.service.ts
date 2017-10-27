import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CustomerRatingComponent } from './customerRating.component';

@Injectable()
export class CustomerRatingGuard implements CanDeactivate<CustomerRatingComponent> {

    canDeactivate(component: CustomerRatingComponent): boolean {
        if (component.customerRatingForm.dirty) {
            let name = component.customerRatingForm.get('name').value || 'New CustomerRating';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}