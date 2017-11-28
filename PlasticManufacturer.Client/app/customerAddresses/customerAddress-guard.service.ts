import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CustomerAddressComponent } from './customerAddress.component';

@Injectable()
export class CustomerAddressGuard implements CanDeactivate<CustomerAddressComponent> {

    canDeactivate(component: CustomerAddressComponent): boolean {
        if (component.customerAddressForm.dirty) {
            let name = component.customerAddressForm.get('name').value || 'New CustomerAddress';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}


