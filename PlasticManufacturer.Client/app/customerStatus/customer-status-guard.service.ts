import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CustomerStatusComponent } from './customer-status.component';

@Injectable()
export class CustomerStatusGuard implements CanDeactivate<CustomerStatusComponent> {

    canDeactivate(component: CustomerStatusComponent): boolean {
        if (component.customerStatusForm.dirty) {
            let name = component.customerStatusForm.get('name').value || 'New Carrier';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}