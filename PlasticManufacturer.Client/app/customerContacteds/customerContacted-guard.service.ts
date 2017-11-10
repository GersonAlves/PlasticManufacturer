import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CustomerContactedComponent } from './customerContacted.component';

@Injectable()
export class CustomerContactedGuard implements CanDeactivate<CustomerContactedComponent> {

    canDeactivate(component: CustomerContactedComponent): boolean {
        if (component.customerContactedForm.dirty) {
            let name = component.customerContactedForm.get('name').value || 'New Customer Contacted';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}