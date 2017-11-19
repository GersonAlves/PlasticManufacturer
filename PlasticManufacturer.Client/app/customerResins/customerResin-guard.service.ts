import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CustomerResinComponent } from './customerResin.component';

@Injectable()
export class CustomerResinGuard implements CanDeactivate<CustomerResinComponent> {

    canDeactivate(component: CustomerResinComponent): boolean {
        if (component.customerResinForm.dirty) {
            let name = component.customerResinForm.get('name').value || 'New customerResin';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}