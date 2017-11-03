import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { SalesOrderComponent } from './salesOrder.component';

@Injectable()
export class SalesOrderGuard implements CanDeactivate<SalesOrderComponent> {

    canDeactivate(component: SalesOrderComponent): boolean {
        if (component.salesOrderForm.dirty) {
            let name = component.salesOrderForm.get('name').value || 'New Packaging';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}