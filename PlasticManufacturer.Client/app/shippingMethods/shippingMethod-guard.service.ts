import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ShippingMethodComponent } from './shippingMethod.component';

@Injectable()
export class ShippingMethodGuard implements CanDeactivate<ShippingMethodComponent> {

    canDeactivate(component: ShippingMethodComponent): boolean {
        if (component.shippingMethodForm.dirty) {
            let name = component.shippingMethodForm.get('name').value || 'New shippingMethod';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}