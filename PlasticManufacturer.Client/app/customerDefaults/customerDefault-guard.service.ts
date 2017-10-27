import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CustomerDefaultComponent } from './customerDefault.component';

@Injectable()
export class CustomerDefaultGuard implements CanDeactivate<CustomerDefaultComponent> {

    canDeactivate(component: CustomerDefaultComponent): boolean {
        if (component.customerDefaultForm.dirty) {
            let name = component.customerDefaultForm.get('name').value || 'New CustomerDefault';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}