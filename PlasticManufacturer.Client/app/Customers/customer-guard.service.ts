import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CustomerComponent } from './customer.component';

@Injectable()
export class CustomerGuard implements CanDeactivate<CustomerComponent> {

    canDeactivate(component: CustomerComponent): boolean {
        if (component.customerForm.dirty) {
            let name = component.customerForm.get('name').value || 'New Carrier';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}